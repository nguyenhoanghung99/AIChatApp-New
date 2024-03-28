import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import {
  AppIcon,
  AppText,
  AppTouchableOpacity,
  AppPressable,
  AppView,
} from '@/components';
import {
  FontSizes,
  Icons,
  Theme,
  isIOS,
  responsiveHeight,
  responsiveWidth,
} from '@/themes';

type TProps = TDefaultChannel;
export default function ChannelDefaultMessage({
  onPress,
  title,
  content,
  backgroundColor
}: TProps) {
  const { t } = useTranslation();
  const { colors } = useTheme<Theme>();
  return (
    <AppPressable
      backgroundColor={'neutralGrey5'}
      paddingHorizontal="base"
      paddingVertical="xs"
      onPress={onPress}
      flexDirection="row"
      alignItems="center">
      <AppView
        width={responsiveHeight(50)}
        height={responsiveHeight(50)}
        alignItems="center"
        justifyContent="center"
        backgroundColor={backgroundColor}
        style={{ borderRadius: responsiveHeight(50 / 2) }}>
        <AppIcon
          name={Icons.AskAi}
          color={colors.white}
          size={isIOS ? FontSizes.heading4 : FontSizes.heading5}
        />
      </AppView>
      <AppView flex={1} marginLeft="xs">
        <AppView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <AppView flex={1} marginRight="xxs">
            <AppText variant="baseSemiBold" numberOfLines={1} color='neutralGrey9'>
              {title}
            </AppText>
          </AppView>
          <AppTouchableOpacity>
            <AppText variant="span" color="lightLink">
              {t('See All')}
            </AppText>
          </AppTouchableOpacity>
        </AppView>
        <AppView flexDirection="row">
          <AppView flex={1}>
            <AppText
              variant="span"
              color="neutralGrey6"
              numberOfLines={1}
              marginRight="xxs">
              {content}
            </AppText>
          </AppView>
          <AppView flexDirection="row" alignItems="center" gap="xs">
            <AppIcon
              name={Icons.Pin}
              size={FontSizes.body}
              color={colors.neutralGrey6}
            />
          </AppView>
        </AppView>
      </AppView>
    </AppPressable>
  );
}
