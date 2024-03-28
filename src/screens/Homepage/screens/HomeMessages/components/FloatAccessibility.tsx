import React from 'react';
import { useTheme } from '@shopify/restyle';
import { AppIcon, AppTouchableOpacity, AppView } from '@/components';
import {
  BaseStyles,
  FontSizes,
  Icons,
  Theme,
  isIOS,
  responsiveHeight,
  responsiveWidth,
} from '@/themes';

type TProps = {
  onPress: () => void;
};
export default function FloatAccessibility({ onPress }: TProps) {
  const { colors } = useTheme<Theme>();
  return (
    <AppTouchableOpacity
      position="absolute"
      bottom={responsiveHeight(10)}
      right={responsiveWidth(10)}
      onPress={onPress}>
      <AppView
        width={responsiveHeight(44)}
        height={responsiveHeight(44)}
        style={{ borderRadius: responsiveHeight(44 / 2) }}
        backgroundColor="lightLink"
        alignContent="center"
        justifyContent="center">
        <AppIcon
          name={Icons.Plus}
          size={isIOS ? FontSizes.xlarge : FontSizes.large}
          color={colors.white}
          style={BaseStyles.textCenter}
        />
      </AppView>
    </AppTouchableOpacity>
  );
}
