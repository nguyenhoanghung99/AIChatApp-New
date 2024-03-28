import React, { useCallback } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import {
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
import { useMutationAuthen } from '@/hooks';
import { StorageKeys, configs } from '@/constants';
import { Storage, validateFormRegister } from '@/utilities';
import { container } from 'tsyringe';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@shopify/restyle';
type TProps = {
  onPrev: () => void;
  onNext: () => void;
};
const storage = container.resolve(Storage);
export default function AuthenRegister({ onPrev }: TProps) {
  const { t } = useTranslation();
  const { onRegisterUser, isPending, isSuccess } = useMutationAuthen();
  const { colors } = useTheme<Theme>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegister>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validateFormRegister),
  });
  const onSubmit = useCallback(
    async (value: TRegister) => {
      const form = {
        ...value,
        deviceName: (await configs.DEVICE_NAME) as any,
        deviceId: configs.DEVICE_ID,
        fcmToken: storage.getItem(StorageKeys.FCM_TOKEN),
        platform: configs.PLATFORM,
      } as TRegister;
      onRegisterUser(form, () => {
        onPrev();
        reset();
      });
    },
    [onPrev, onRegisterUser, reset],
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
        <AppTouchableOpacity onPress={onPrev}>
          <AppIcon name={Icons.ChevronLeft} size={FontSizes.span} color={colors.neutralGrey9} />
        </AppTouchableOpacity>
        <AppText variant="heading3" marginLeft="xs" color='neutralGrey9'>
          {t('Create Account')}
        </AppText>
      </AppView>
      <AppView paddingHorizontal="base">
        <AppView
          alignItems="center"
          justifyContent="center"
          marginVertical="xxl">
          <Image
            source={Images.friendifyLogo}
            style={{ height: responsiveHeight(75), width: responsiveWidth(286) }}
            resizeMode="contain"
          />
        </AppView>
        <KeyboardAwareScrollView
          bottomOffset={60}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <AppView height={height} flex={1}>
            <Controller
              control={control}
              name="fullName"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur } }) => (
                <AppInput
                  label="Full Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors?.fullName?.message}
                  isRequired
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur } }) => (
                <AppInput
                  label="Email Address"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors?.email?.message}
                  isRequired
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur } }) => (
                <AppInput
                  label="Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors?.password?.message}
                  isPassword
                  isRequired
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur } }) => (
                <AppInput
                  label="Confirm Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors?.confirmPassword?.message}
                  isPassword
                  isRequired
                />
              )}
            />
            <Controller
              control={control}
              name="inviteCode"
              render={({ field: { onChange, onBlur } }) => (
                <AppInput
                  label="Invite Code"
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <AppTouchableOpacity
              height={48}
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              backgroundColor="neutralGrey9"
              borderRadius="xs"
              paddingVertical="xxs"
              onPress={handleSubmit(onSubmit)}>
              <AppText color="white" textAlign="center">
                {t('Create Account')}
              </AppText>
              {isPending && !isSuccess && (
                <ActivityIndicator color={colors.white} />
              )}
            </AppTouchableOpacity>
            <AppView
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              marginVertical="md">
              <AppText variant="span" color="neutralGrey6">
                {t('Already have account?')}
              </AppText>
              <AppTouchableOpacity onPress={onPrev}>
                <AppText variant="span" marginLeft="tiny" color='neutralGrey9'>
                  {t('Log In')}
                </AppText>
              </AppTouchableOpacity>
            </AppView>
          </AppView>
        </KeyboardAwareScrollView>
      </AppView>
    </AppView>
  );
}
