import {useCallback} from 'react';
import {container} from 'tsyringe';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {MutationKeys, QueryKeys, StorageKeys} from '@/constants';
import {AuthenService} from '@/services';
import {Storage} from '@/utilities';
import {ToastAndroid} from 'react-native';
import {useAuthStore} from '@/stores';

const storage = container.resolve(Storage);
export const useMutationAuthen = () => {
  const queryClient = useQueryClient();
  const {setUserInfo, removeUserInfo} = useAuthStore(state => state);
  const {
    mutate: mutationLogin,
    isPending: isLoginPending,
    isSuccess,
  } = useMutation<
    TResponse<TAuthentication>,
    TResponse<TAuthentication>,
    TLoginEmail
  >({
    mutationKey: [MutationKeys.LOGIN],
    mutationFn: (form: TLoginEmail) => AuthenService.loginEmail(form),
  });
  const {mutate: mutationRegister, isPending: isRegisterPending} = useMutation({
    mutationKey: [MutationKeys.REGISTER],
    mutationFn: (form: TRegister) => AuthenService.register(form),
  });

  const {mutate: mutationLoginSocial, isPending: isLoginSocial} = useMutation({
    mutationKey: [MutationKeys.LOGIN_SOCIAL],
    mutationFn: (form: TLoginSocial) => AuthenService.loginSocial(form),
  });

  const {mutate: mutationLogout, isPending: isLogoutPending} = useMutation({
    mutationKey: [MutationKeys.LOGOUT],
    mutationFn: () => AuthenService.logout(),
    onError: (error: Error) => {
      console.log('Logout error', error);
    },
    onSuccess: () => {
      queryClient.clear();
      storage.removeItem(StorageKeys.FCM_TOKEN);
      storage.removeItem(StorageKeys.TOKEN);
      removeUserInfo();
    },
  });

  const {mutate: mutationUpdateProfile, isPending: isUpdateProfilePending} =
    useMutation({
      mutationKey: [MutationKeys.UPDATE_PROFILE],
      mutationFn: (form: FormData) => AuthenService.updateProfile(form),
    });

  const {
    mutate: mutationChangePassword,
    isPending: isChangePasswordPending,
    isSuccess: isChangePasswordSuccess,
  } = useMutation({
    mutationKey: [MutationKeys.CHANGE_PASSWORD],
    mutationFn: (form: TChangePassword) => AuthenService.changePassword(form),
  });

  const onRegisterUser = useCallback(
    (form: TRegister, cb?: () => void) => {
      mutationRegister(form, {
        onError: (error: Error) => {
          console.log('Register error', error);
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        },
        onSuccess: async (data: TResponse<any>) => {
          if (data?.statusCode === 200) {
            console.log('REGISTER SUCCESS', data);
            ToastAndroid.showWithGravity(
              data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            cb?.();
          }
        },
      });
    },
    [mutationRegister],
  );

  const onLoginUser = useCallback(
    (form: TLoginEmail, cb?: () => void) => {
      mutationLogin(form, {
        onError: (error: TResponse<any>) => {
          console.log('Login', error);
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        },
        onSuccess: async (data: TResponse<any>) => {
          console.log('Data==============', data);
          const {accessToken, refreshToken} = data.data;
          if (data?.statusCode === 200) {
            storage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
            storage.setItem(StorageKeys.TOKEN, accessToken);
            const response = await queryClient.fetchQuery<TResponse<TInfoUser>>(
              {
                queryKey: [QueryKeys.INFO_USER],
                queryFn: () => AuthenService.getProfileUser(),
              },
            );
            console.log('response', response);
            queryClient.refetchQueries({
              queryKey: [QueryKeys.LIST_CHANNELS],
            });
            setUserInfo({...response.data, password: '', refreshToken: ''});
            console.log(response.data);
            cb?.();
          }
        },
      });
    },
    [mutationLogin, queryClient, setUserInfo],
  );

  const onChangePasswordUser = useCallback(
    (form: TChangePassword, cb?: () => void) => {
      mutationChangePassword(form, {
        onError: (error: Error) => {
          console.log('Change password', error);
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        },
        onSuccess: async (data: TResponse<any>) => {
          if (data?.statusCode === 200) {
            ToastAndroid.showWithGravity(
              data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            cb?.();
          }
        },
      });
    },
    [mutationLogin, queryClient],
  );

  const onUpdateProfileUser = useCallback(
    (form: FormData, cb?: () => void) => {
      console.log('FORM UPDATE', form);
      mutationUpdateProfile(form, {
        onError: (error: Error) => {
          console.log('Update error', error);
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        },
        onSuccess: async (data: TResponse<any>) => {
          if (data?.statusCode === 200) {
            console.log('Update Profile success', data);
            ToastAndroid.showWithGravity(
              data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            cb?.();
            setUserInfo({...data.data, password: '', refreshToken: ''});
          }
        },
      });
    },
    [mutationUpdateProfile],
  );

  const onLoginSocialGoogle = useCallback(
    async (form: TLoginSocial, cb?: () => void) => {
      console.log('form', form);
      try {
        await GoogleSignin.hasPlayServices();
        const result = await GoogleSignin.signIn();
        console.log('idTokenGoogle', result);
        if (result?.idToken) {
          mutationLoginSocial(
            {...form, idToken: result.idToken, type: 'GOOGLE'},
            {
              onError: (error: Error) => {
                console.log('Login social', error);
                ToastAndroid.showWithGravity(
                  error.message,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              },
              onSuccess: async (data: TResponse<any>) => {
                const {accessToken, refreshToken} = data.data;
                storage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
                storage.setItem(StorageKeys.TOKEN, accessToken);
                if (data?.statusCode === 200) {
                  const response = await queryClient.fetchQuery<
                    TResponse<TInfoUser>
                  >({
                    queryKey: [QueryKeys.INFO_USER],
                    queryFn: () => AuthenService.getProfileUser(),
                  });
                  queryClient.refetchQueries({
                    queryKey: [QueryKeys.LIST_CHANNELS],
                  });
                  console.log(response.data);
                  cb?.();
                }
              },
            },
          );
        }
      } catch (error) {
        console.log('Login google error', error);
        ToastAndroid.showWithGravity(
          'Login google error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    },
    [mutationLoginSocial, queryClient],
  );

  const onLoginSocialApple = useCallback(
    async (form: TLoginSocial, cb?: () => void) => {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned');
        }
        if (appleAuthRequestResponse) {
          let fullName = '';
          if (appleAuthRequestResponse?.fullName?.familyName) {
            fullName += appleAuthRequestResponse.fullName.familyName;
          }
          if (appleAuthRequestResponse?.fullName?.givenName) {
            if (fullName) {
              fullName += ` ${appleAuthRequestResponse.fullName.givenName}`;
            } else {
              fullName += appleAuthRequestResponse.fullName.givenName;
            }
          }
          mutationLoginSocial(
            {
              ...form,
              idToken: appleAuthRequestResponse.identityToken,
              type: 'APPLE',
            },
            {
              onError: (error: Error) => {
                console.log('Login social', error);
                ToastAndroid.showWithGravity(
                  error.message,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              },
              onSuccess: async (data: TResponse<any>) => {
                const {accessToken, refreshToken} = data.data;
                storage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
                storage.setItem(StorageKeys.TOKEN, accessToken);
                if (data?.statusCode === 200) {
                  const response = await queryClient.fetchQuery<
                    TResponse<TInfoUser>
                  >({
                    queryKey: [QueryKeys.INFO_USER],
                    queryFn: () => AuthenService.getProfileUser(),
                  });
                  queryClient.refetchQueries({
                    queryKey: [QueryKeys.LIST_CHANNELS],
                  });
                  console.log(response.data);
                  cb?.();
                }
              },
            },
          );
        }
      } catch (error) {
        console.log('Login apple error', error);
        ToastAndroid.showWithGravity(
          'Login google error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    },
    [mutationLoginSocial, queryClient],
  );

  return {
    mutationLogin,
    mutationRegister,
    mutationLogout,
    mutationUpdateProfile,
    mutationChangePassword,
    onRegisterUser,
    onLoginUser,
    onUpdateProfileUser,
    onLoginSocialGoogle,
    onLoginSocialApple,
    onChangePasswordUser,
    isPending:
      isLoginPending ||
      isRegisterPending ||
      isLogoutPending ||
      isUpdateProfilePending ||
      isChangePasswordPending ||
      isLoginSocial,
    isSuccess: isSuccess || isChangePasswordSuccess,
  };
};
