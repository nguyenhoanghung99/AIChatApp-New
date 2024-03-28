import React from 'react';
import AppModal, {TModalProps} from './AppModal';
import {AppText, AppView} from '..';
import {BaseStyles, FontSizes, ThemeColors} from '@/themes';
import AppButton from '../AppButton/AppButton';

interface TAppAskModal extends TModalProps {
  title?: string;
  message?: string;
  arrBtn?: Array<{
    title: string;
    textColor?: ThemeColors | string;
    btnColor?: ThemeColors | string;
    onPress: () => void;
  }>;
}

const AppAskModal = ({arrBtn, title, message, ...rest}: TAppAskModal) => {
  return (
    <AppModal transparent {...rest}>
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
            {title}
          </AppText>
          <AppText
            fontWeight="400"
            fontSize={FontSizes.body}
            textAlign="center"
            color="black">
            {message}
          </AppText>
          <AppView flexDirection="row" gap="xxs">
            {arrBtn?.map((btn, i) => {
              return (
                <AppButton
                  key={i}
                  onPress={btn.onPress}
                  alignItems="center"
                  // @ts-ignore
                  backgroundColor={btn.btnColor}
                  borderWidth={1}
                  paddingVertical="sm"
                  paddingHorizontal="base"
                  style={BaseStyles.flex1}
                  borderRadius="sm">
                  <AppText
                    fontSize={FontSizes.span}
                    // @ts-ignore
                    color={btn.textColor}>
                    {btn.title}
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

export default AppAskModal;
