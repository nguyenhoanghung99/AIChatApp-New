import React from 'react';
import {AppIcon, AppText, AppTouchableOpacity, AppView} from '@/components';
import {
  height,
  width,
  Icons,
  FontSizes,
  Images,
  responsiveHeight,
  responsiveWidth,
  Theme,
} from '@/themes';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import { useTheme } from '@shopify/restyle';

type TProps = {
  onPrev: () => void;
  onNext: () => void;
};
export default function AuthenForgotPassword({onPrev}: TProps) {
  const {t} = useTranslation();
  const {colors} = useTheme<Theme>()
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
          <AppIcon name={Icons.ChevronLeft} size={FontSizes.span} color={colors.neutralGrey9}/>
        </AppTouchableOpacity>
        <AppText variant="heading3" marginLeft="xs" color='neutralGrey9'>
          {t('Forgot Password')}
        </AppText>
      </AppView>
      <AppView>
        <AppView
          alignItems="center"
          justifyContent="center"
          marginVertical="xxl">
          <Image
            source={Images.friendifyLogo}
            style={{height: responsiveHeight(75), width: responsiveWidth(286)}}
            resizeMode="contain"
          />
        </AppView>
      </AppView>
    </AppView>
  );
}
