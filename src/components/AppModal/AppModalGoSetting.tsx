import React, {useState} from 'react';
import AppModal, {TModalProps} from './AppModal';
import {AppText, AppView} from '..';
import {BaseStyles, FontSizes, ThemeColors, isIOS} from '@/themes';
import AppButton from '../AppButton/AppButton';
import {useTranslation} from 'react-i18next';
import {Linking} from 'react-native';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import {messagePermissionAndroid} from '@/utilities';
import {useModalStore} from '@/stores';
const androidVersion: string = DeviceInfo.getSystemVersion();

interface TAppModalGoSetting extends TModalProps {
  onClose?: () => void;
  onDeny?: () => void;
  title?: string;
  settingPath?: string;
}

const AppModalGoSetting = ({
  onClose,
  onDeny,
  title,
  settingPath,
  ...rest
}: TAppModalGoSetting) => {
  const {t} = useTranslation();
  const {setIsShowGoSetting} = useModalStore();

  const openSetting = async () => {
    Linking.openSettings().catch(() => {
      Toast.show(t('Unable to open settings'), Toast.SHORT);
    });
  };

  const buttons = [
    {
      text: t('Deny'),
      onPress: setIsShowGoSetting,
    },
    {
      text: t('Go to Settings'),
      onPress: openSetting,
    },
  ];
  return (
    <AppModal animationType="fade" transparent {...rest}>
      <AppView
        justifyContent="center"
        alignItems="center"
        flex={1}
        backgroundColor="backdrop">
        <AppView
          width={320}
          backgroundColor="white"
          justifyContent="center"
          alignItems="center"
          padding="lg"
          borderRadius="sm"
          gap="base">
          <AppText variant={'headingS2'} textAlign="center" color="black">
            {t('Notice')}
          </AppText>
          <AppText
            fontWeight="400"
            fontSize={FontSizes.body}
            textAlign="center"
            color="black">
            {`${t(
              title ||
                'Allow Friendify to access your photos to download images. Press:',
            )} ${t('Go to Settings')} ${
              isIOS
                ? t('Photos > Selected Photos or All Photos')
                : t(
                    messagePermissionAndroid[androidVersion] ||
                      messagePermissionAndroid.default,
                  )
            }`}
          </AppText>
          <AppView flexDirection="row" gap="xxs">
            {buttons?.map((btn, i) => {
              return (
                <AppButton
                  key={i}
                  onPress={btn.onPress}
                  alignItems="center"
                  backgroundColor="color26"
                  borderWidth={1}
                  paddingVertical="sm"
                  paddingHorizontal="base"
                  style={BaseStyles.flex1}
                  borderRadius="sm">
                  <AppText fontSize={FontSizes.span} color="white">
                    {btn.text}
                  </AppText>
                </AppButton>
              );
            })}
          </AppView>
        </AppView>
      </AppView>
    </AppModal>
  );
};

export default AppModalGoSetting;
