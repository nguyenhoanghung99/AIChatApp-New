import React, { memo, useCallback } from 'react';
import {
  AppAvatar,
  AppIcon,
  AppText,
  AppTouchableOpacity,
  AppView,
} from '@/components';
import { FontSizes, Icons, Theme, isIOS } from '@/themes';
import { useTheme } from '@shopify/restyle';
import { goBack, navigate } from '@/navigator/NavigationService';
import { CHAT_MESSAGE_TYPE } from '@/constants';
import { Routes } from '@/navigator/Routes';

type TProps = {
  title: string;
  member?: string;
  avatar: string;
  type: string;
};
function AppChatHeader({ title, member, avatar, type }: TProps) {
  const { colors } = useTheme<Theme>();
  const onNavigation = useCallback(() => {
    if (type === CHAT_MESSAGE_TYPE.GROUP_CHAT) {
      return navigate(Routes.ProfileGroup);
    }
    navigate(Routes.ProfileUser);
  }, [type]);
  return (
    <AppView
      paddingHorizontal="base"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingBottom="xs"
    >
      <AppView
        flexDirection="row"
        alignItems="center"
        gap="xs"
        flex={1}
        marginRight="xxl"
        marginTop={isIOS ? 'reset' : 'xs'}
        >
        <AppTouchableOpacity onPress={goBack}>
          <AppIcon name={Icons.ChevronLeft} size={FontSizes.large} color={colors.neutralGrey9}/>
        </AppTouchableOpacity>
        <AppTouchableOpacity
          flexDirection="row"
          alignItems="center"
          gap="xxs"
          onPress={onNavigation}>
          <AppAvatar avatar={avatar} isOnline />
          <AppView flex={1}>
            <AppText variant="spanSemibold" color={'black'} numberOfLines={1}>
              {title}
            </AppText>
            {member && (
              <AppText variant="span" color={'black'} numberOfLines={1}>
                {member}
              </AppText>
            )}
          </AppView>
        </AppTouchableOpacity>
      </AppView>
      <AppTouchableOpacity
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="xxs">
        <AppIcon
          name={Icons.Diamond}
          size={FontSizes.large}
          color={colors.black}
        />
        <AppText variant="spanSemibold" color={'black'}>
          1.234M
        </AppText>
      </AppTouchableOpacity>
    </AppView>
  );
}
export default memo(AppChatHeader);
