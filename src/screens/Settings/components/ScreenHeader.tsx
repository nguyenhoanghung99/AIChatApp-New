import React from 'react';
import { AppButton, AppIcon, AppText, AppView } from '@/components';
import { goBack } from '@/navigator';
import { Icons } from '@/themes';

type ScreenHeader = {
  leftOpt?: React.ReactNode;
  rightOtp?: React.ReactNode;
  title?: string;
};

const ScreenHeader = ({ leftOpt, rightOtp, title }: ScreenHeader) => {
  return (
    <AppView
      backgroundColor="white"
      flexDirection="row"
      justifyContent="space-between"
      height={50}
      paddingHorizontal="base"
      alignItems="center">
      <AppButton
        width={24}
        height={24}
        justifyContent="center"
        onPress={() => goBack()}
        alignItems="center">
        {leftOpt ?? <AppIcon name={Icons.Back} size={24} color={'black'} />}
      </AppButton>
      <AppText
        color="black"
        variant={'headingS2'}
        lineHeight={22}>
        {title}
      </AppText>
      <AppButton width={50} height={50}>
        {rightOtp}
      </AppButton>
    </AppView>
  );
};

export default ScreenHeader;