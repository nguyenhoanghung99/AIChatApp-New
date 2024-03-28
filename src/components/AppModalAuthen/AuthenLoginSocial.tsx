import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import { container } from 'tsyringe';
import { useTheme } from '@shopify/restyle';
import { useMutationAuthen } from '@/hooks';
import { AppIcon, AppText, AppTouchableOpacity, AppView } from '@/components';
import { FontSizes, Icons, Theme, isIOS } from '@/themes';
import { StorageKeys, configs } from '@/constants';
import { Storage } from '@/utilities';

const storage = container.resolve(Storage);

type TProps = {
  onClose: () => void;
};

export default function AuthenLoginSocial({ onClose }: TProps) {
  const { t } = useTranslation();
  const { onLoginSocialGoogle, isPending, isSuccess, onLoginSocialApple } =
    useMutationAuthen();
  const { colors } = useTheme<Theme>();

  const loginGoogle = async () => {
    const data = {
      deviceName: (await configs.DEVICE_NAME) as string,
      deviceId: configs.DEVICE_ID,
      fcmToken: storage.getItem(StorageKeys.FCM_TOKEN),
      platform: configs.PLATFORM,
      ipAddress: (await configs.ADDRESS_IP) as string,
    };
    onLoginSocialGoogle(data, onClose);
  };
  const loginApple = async () => {
    const data = {
      deviceName: (await configs.DEVICE_NAME) as string,
      deviceId: configs.DEVICE_ID,
      fcmToken: storage.getItem(StorageKeys.FCM_TOKEN),
      platform: configs.PLATFORM,
      ipAddress: (await configs.ADDRESS_IP) as string,
    };
    onLoginSocialApple(data, onClose);
  };

  return (
    <>
      <AppView marginVertical="md" flexDirection="row">
        <AppView
          backgroundColor="black"
          height={1}
          flex={1}
          alignSelf="center"
        />
        <AppText marginHorizontal="base" variant="span" color='neutralGrey9'>
          {t('Or')}
        </AppText>
        <AppView
          backgroundColor="black"
          height={1}
          flex={1}
          alignSelf="center"
        />
      </AppView>
      <AppTouchableOpacity
        height={48}
        onPress={loginGoogle}
        backgroundColor="neutralGrey9"
        borderRadius="sm"
        paddingVertical="xxs"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap='xs'
        marginBottom="md">
        <AppIcon size={FontSizes.large} color={colors.white} name={Icons.Google} />
        <AppText color="white" textAlign="center">
          {t('Continue with Google')}
        </AppText>
        {isPending && !isSuccess && <ActivityIndicator color={colors.white} />}
      </AppTouchableOpacity>
      {isIOS && (
        <AppTouchableOpacity
          height={48}
          onPress={loginApple}
          backgroundColor="neutralGrey9"
          borderRadius="sm"
          paddingVertical="xxs"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap='xs'
        >
          <AppIcon size={FontSizes.large} color={colors.white} name={Icons.Apple} />
          <AppText color="white" textAlign="center">
            {t('Continue with Apple')}
          </AppText>
          {isPending && !isSuccess && <ActivityIndicator color={colors.white} />}
        </AppTouchableOpacity>
      )}
    </>
  );
}
