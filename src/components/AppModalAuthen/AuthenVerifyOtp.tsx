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
} from '@/themes';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';

type TProps = {
  onPrev: () => void;
  onNext: () => void;
};
export default function AuthenVerifyOtp({}: TProps) {
  const {t} = useTranslation();
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
        <AppTouchableOpacity>
          <AppIcon name={Icons.ChevronLeft} size={FontSizes.span} />
        </AppTouchableOpacity>
        <AppText variant="heading3" marginLeft="xs">
          {t('Verify')}
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
