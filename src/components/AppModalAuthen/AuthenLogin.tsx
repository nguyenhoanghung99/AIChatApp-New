import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Image} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useTheme} from '@shopify/restyle';
import {container} from 'tsyringe';
import AuthenLoginSocial from './AuthenLoginSocial';
import {
  AppCheckbox,
  AppIcon,
  AppInput,
  AppText,
  AppTouchableOpacity,
  AppView,
} from '@/components';
import {
  FontSizes,
  Icons,
  Images,
  Theme,
  height,
  responsiveHeight,
  responsiveWidth,
  width,
} from '@/themes';
import {StorageKeys, configs, getIpAddress} from '@/constants';
import {Storage, validateFormLogin} from '@/utilities';
import {yupResolver} from '@hookform/resolvers/yup';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import messaging from '@react-native-firebase/messaging';
import {useMutationAuthen} from '@/hooks';

type TProps = {
  onClose: () => void;
  onNext: () => void;
  onForgot: () => void;
};

const storage = container.resolve(Storage);
export default function AuthenLogin({onClose, onNext, onForgot}: TProps) {
  const {t} = useTranslation();
  const {onLoginUser, isPending, isSuccess} = useMutationAuthen();
  const {colors} = useTheme<Theme>();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<TLoginEmail>({
    mode: 'onChange',
    defaultValues: {
      email: 'nguyen0227@gmail.com',
      password: 'Nguyen@1997',
    },
    // resolver: yupResolver(validateFormLogin),
  });
  const onSubmit = useCallback(
    async (value: TLoginEmail) => {
      const form = {
        ...value,
        deviceName: (await configs.DEVICE_NAME) as string,
        deviceId: configs.DEVICE_ID,
        fcmToken: await messaging().getToken(),
        platform: configs.PLATFORM,
        ipAddress: (await getIpAddress()) as string,
      } as TLoginEmail;
      onLoginUser(form, () => {
        onClose();
        reset();
      });
    },
    [onClose, onLoginUser, reset],
  );

  return (
    <AppView height={height} width={width} backgroundColor="neutralGrey5">
      <AppView
        paddingHorizontal="base"
        flexDirection="row"
        alignItems="center"
        paddingBottom="base"
        borderBottomWidth={0.5}
        borderBottomColor="borderBottom"
        backgroundColor="white">
        <AppTouchableOpacity onPress={onClose}>
          <AppIcon name={Icons.Close} size={FontSizes.span} color={colors.neutralGrey9}/>
        </AppTouchableOpacity>
        <AppText variant="heading3" marginLeft="xs" color='neutralGrey9'>
          {t('Login')}
        </AppText>
      </AppView>
      <KeyboardAwareScrollView
         bottomOffset={60}
         showsVerticalScrollIndicator={false}>
        <AppView paddingHorizontal="base">
          <AppView
            alignItems="center"
            justifyContent="center"
            marginVertical="xxl">
            <Image
              source={Images.friendifyLogo}
              style={{
                height: responsiveHeight(75),
                width: responsiveWidth(286),
              }}
              resizeMode="contain"
            />
          </AppView>
          <Controller
            control={control}
            name="email"
            rules={{
              required: true,
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <AppInput
                label="Email"
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.email?.message}
                autoCapitalize="none"
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: true,
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <AppInput
                label="Password"
                onChangeText={onChange}
                onBlur={onBlur}
                isPassword
                error={errors?.password?.message}
                value={value}
              />
            )}
          />
          <AppView
            paddingVertical="base"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row">
            <AppCheckbox label={'Remember me'} onChange={() => {}} />
            <AppTouchableOpacity onPress={onForgot}>
              <AppText color="black" textAlign="center" variant="span">
                {t('Forgot password?')}
              </AppText>
            </AppTouchableOpacity>
          </AppView>
          <AppTouchableOpacity
            height={48}
            backgroundColor="neutralGrey9"
            borderRadius="sm"
            paddingVertical="xxs"
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            flexDirection="row"
            justifyContent="center"
            alignItems="center">
            <AppText color="white" textAlign="center" marginRight="xxs">
              {t('Login')}
            </AppText>
            {isPending && !isSuccess && (
              <ActivityIndicator color={colors.white} />
            )}
          </AppTouchableOpacity>
          <AuthenLoginSocial onClose={onClose} />
          <AppView
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            marginVertical="md">
            <AppText variant="span" color="neutralGrey6">
              {t('Don’t have account?')}
            </AppText>
            <AppTouchableOpacity onPress={onNext}>
              <AppText variant="span" marginLeft="tiny" color='neutralGrey9'>
                {t('Create Account')}
              </AppText>
            </AppTouchableOpacity>
          </AppView>
        </AppView>
      </KeyboardAwareScrollView>
    </AppView>
  );
}
