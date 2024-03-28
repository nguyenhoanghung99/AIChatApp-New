import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { AppAvatar, AppPressable, AppSwipeableReply, AppText, AppView, ThreadActionMessage } from '@/components';
import { height, isIOS, responsiveHeight, responsiveWidth, width } from '@/themes';
import { StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

type TProps = TMessageProps & {};
function MessageReply({
  content,
  justify,
  avatar,
  isMyMessage,
  message,
  roomId,
  isPinMessage
}: TProps) {
  const swipeableRowRef = useRef<Swipeable | null>(null);
  const pressableRef = useRef<any>(null)
  const modalRef = useRef<TModalRef>(null);
  const removeReplySender = useMemo(() => {
    const { replySender, ...rest } = message;
    return {
      ...rest
    }
  }, [])
  const [position, setPosition] = useState({
    top: 0,
  })
  const onLongPress = useCallback(() => {
    modalRef.current?.onShow();
    pressableRef?.current?.measure((x: number,
      y: number,
      w: number,
      h: number,
      pageX: number,
      pageY: number,) => {
      if (pageY > (isIOS ? responsiveHeight(380) : responsiveHeight(380)) || w > responsiveWidth(250)) {
        setPosition({
          top: height * 0.3,
        })
        return
      }
      setPosition({
        top: pageY,
      })
    })
  }, [])
  return (
    <AppSwipeableReply
      isMyMessage={isMyMessage}
      swipeableRowRef={swipeableRowRef}
      message={removeReplySender!}
    >
      <AppView style={[{ justifyContent: justify }, styles.container]}>
        {!isMyMessage && (
          <AppAvatar
            avatar={avatar}
            width={28}
            height={28}
            borderRadius={28}
          />
        )}
        <AppPressable
          backgroundColor="white"
          maxWidth={width * 0.75}
          paddingHorizontal="xs"
          paddingVertical="xxs"
          borderRadius="base"
          ref={pressableRef}
          onLongPress={onLongPress}
        >
          <AppView flexDirection='row' gap='xxs' marginBottom='xxs'>
            <AppView width={2} height={responsiveHeight(44)} backgroundColor='lightLink' />
            <AppView>
              <AppText variant='baseSemiBold' color='neutralGrey9'>{message?.replySender?.sender?.fullName}</AppText>
              <AppText variant='span' color="neutralGrey9" numberOfLines={2}>{message?.replySender?.content}</AppText>
            </AppView>
          </AppView>
          <AppText color='neutralGrey9'>{content}</AppText>
        </AppPressable>
      </AppView>
      <ThreadActionMessage
        ref={modalRef}
        position={position}
        modalStyle={[{ justifyContent: justify, flexDirection: 'column', alignItems: isMyMessage ? 'flex-end' : 'flex-start' }]}
        isMyMessage={isMyMessage} 
        roomId={roomId}
        messageId={message?._id}
        userIdPin={message?.sender?._id}
        idMessage={message?.idMessage}
        isPinMessage={isPinMessage}
        message={message}
      >
        <AppPressable
          backgroundColor="white"
          maxWidth={width * 0.75}
          paddingHorizontal="xs"
          paddingVertical="xxs"
          borderRadius="base"
        >
          <AppView flexDirection='row' gap='xxs' marginBottom='xxs'>
            <AppView width={2} height={responsiveHeight(44)} backgroundColor='lightLink' />
            <AppView>
              <AppText variant='baseSemiBold' color='neutralGrey9'>{message?.replySender?.sender?.fullName}</AppText>
              <AppText variant='span' color="neutralGrey9" numberOfLines={2}>{message?.replySender?.content}</AppText>
            </AppView>
          </AppView>
          <AppText>{content}</AppText>
        </AppPressable>
      </ThreadActionMessage>
    </AppSwipeableReply>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: responsiveWidth(8),
    paddingHorizontal: responsiveWidth(16),
    marginBottom: responsiveWidth(6),
  },
});
export default memo(MessageReply)