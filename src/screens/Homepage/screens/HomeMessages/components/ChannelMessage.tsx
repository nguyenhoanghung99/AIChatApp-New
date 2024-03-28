import React, { memo, useCallback } from 'react';
import { useTheme } from '@shopify/restyle';
import { StyleSheet, View } from 'react-native';
import { AppIcon, AppText, AppPressable, AppView, AppAvatar } from '@/components';
import {
  FontSizes,
  Icons,
  Theme,
  responsiveHeight,
} from '@/themes';
import { _format } from '@/utilities';
import { useParseLastMessage, useStatusMessageChannel } from '@/hooks';
import { navigate } from '@/navigator/NavigationService';
import { Routes } from '@/navigator/Routes';
import { CHAT_MESSAGE_TYPE } from '@/constants';

type TProps = TRoom;
function ChannelMessage({
  roomName,
  isMute,
  isPin,
  roomAvatar,
  ...props
}: TProps) {
  const { colors } = useTheme<Theme>();
  const { } = useParseLastMessage(props?.lastMessage?.content);
  const { numberBadge, currentAvatar, currentChannel, lastMessageGroup } =
    useStatusMessageChannel({
      roomName,
      isMute,
      isPin,
      roomAvatar,
      ...props,
    });
  const onDetailMessage = useCallback(() => {
    if (props?.type === CHAT_MESSAGE_TYPE.GROUP_CHAT) {
      navigate(Routes.ChatGroupUser, {
        type: props?.type,
        avatar: roomAvatar,
        members: props?.members,
        roomName,
        roomId: props?._id,
      });
      return
    }
    navigate(Routes.ChatOneUser, {
      type: props?.type,
      avatar: currentAvatar,
      roomName: currentChannel,
      roomId: props?._id,
    });
  }, [
    currentAvatar,
    currentChannel,
    props?._id,
    props?.members,
    props?.type,
    roomAvatar,
    roomName,
  ]);
  return (
    <AppPressable
      backgroundColor={'white'}
      paddingHorizontal="base"
      paddingVertical="xs"
      onPress={onDetailMessage}
      flexDirection="row"
      alignItems="center">
      <AppAvatar
        avatar={(roomAvatar ? roomAvatar : currentAvatar) as string}
        width={50}
        height={50}
        borderRadius={50}
        bottom={-responsiveHeight(2)}
        right={responsiveHeight(1)}
        isOnline
      />
      <AppView flex={1} marginLeft="xs">
        <AppView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <AppView flex={1} marginRight="xxs">
            <AppText variant="baseSemiBold" numberOfLines={1} color='neutralGrey9'>
              {roomName ? roomName : currentChannel}
            </AppText>
          </AppView>
          <AppText variant="span" color="neutralGrey6" marginBottom="xxs">
            {props?.lastSent && _format.dayFromNow(props?.lastSent)}
          </AppText>
        </AppView>
        <AppView flexDirection="row">
          <AppView flex={1}>
            <AppText
              variant="span"
              color="neutralGrey6"
              numberOfLines={1}
              marginRight="xxs">
              {props?.type === CHAT_MESSAGE_TYPE.GROUP_CHAT
                ? lastMessageGroup
                : props?.lastMessage?.content}
            </AppText>
          </AppView>
          <AppView flexDirection="row" alignItems="center" gap="xs">
            {isPin && (
              <AppIcon
                name={Icons.Pin}
                size={FontSizes.body}
                color={colors.neutralGrey6}
              />
            )}
            {isMute && (
              <AppIcon
                name={Icons.Mute}
                size={FontSizes.body}
                color={colors.neutralGrey6}
              />
            )}
            {numberBadge > 0 && <View style={[styles.dot, { backgroundColor: colors.lightLink }]} />}
          </AppView>
        </AppView>
      </AppView>
    </AppPressable>
  );
}
const styles = StyleSheet.create({
  dot: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
  },
});
export default memo(ChannelMessage);
