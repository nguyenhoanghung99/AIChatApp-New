import React from 'react';
import {AppIcon, AppText, AppTouchableOpacity, AppView} from '..';
import AppButton from '../AppButton/AppButton';
import {FontSizes, Icons, Theme} from '@/themes';
import {goBack} from '@/navigator';
import {useAuthStore} from '@/stores';
import {useTheme} from '@shopify/restyle';

type ScreenHeader = {
  leftOpt?: React.ReactNode;
  rightOtp?: React.ReactNode;
  title?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  isShowDiamond?: boolean;
};

const ScreenHeader = ({
  leftOpt,
  rightOtp,
  title,
  onPressLeft,
  onPressRight,
  isShowDiamond = false,
}: ScreenHeader) => {
  const {colors} = useTheme<Theme>();
  const {userInfo} = useAuthStore();
  return (
    <AppView
      backgroundColor="white"
      flexDirection="row"
      justifyContent="space-between"
      height={50}
      paddingHorizontal="base"
      alignItems="center">
      <AppButton
        onPress={() => (onPressLeft ? onPressLeft?.() : goBack())}
        width={24}
        height={24}
        justifyContent="center"
        alignItems="center">
        {leftOpt ?? (
          <AppIcon
            name={Icons.ArrowLeft}
            size={FontSizes.large}
            color={'black'}
          />
        )}
      </AppButton>
      {!isShowDiamond ? (
        <AppText color="black" variant={'headingS2'}>
          {title}
        </AppText>
      ) : (
        <AppTouchableOpacity
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap="xxs">
          <AppIcon
            name={Icons.Diamond}
            size={FontSizes.title}
            color={colors.black}
          />
          <AppText variant="heading2" color={'black'}>
            {userInfo?.points}
          </AppText>
        </AppTouchableOpacity>
      )}

      <AppButton onPress={onPressRight} width={24} height={24}>
        {rightOtp}
      </AppButton>
    </AppView>
  );
};

export default ScreenHeader;
