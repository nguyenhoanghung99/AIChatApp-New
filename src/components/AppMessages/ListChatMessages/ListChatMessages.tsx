import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {
  FlashList,
  ListRenderItem,
  useBlankAreaTracker,
} from '@shopify/flash-list';
import {
  AppFlashlist,
  MessageFile,
  AppView,
  MessageInfoAction,
  MessageMedia,
  MessageReply,
  MessageText,
  ScrollToBottom,
  ThreadMessageForward,
  ThreadMessagePin,
  ThreadMessageReply,
  MessagePinOrUnPin,
  MessageLocation,
  MessageRecording,
} from '@/components';
import { TYPE_MESSAGE } from '@/constants';
import { useSocketChatMessage } from '@/hooks';
import { useAuthStore } from '@/stores';
import { responsiveHeight } from '@/themes';
import { _format } from '@/utilities';

type TProps = {
  messages: TMessage[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  listPins: TMessagePin[]
  isDetailLoading: boolean;
  roomId: string;
  isLoading: boolean;
  isFetchingNextPage: boolean
};
export default function ListChatMessages({
  messages,
  hasNextPage,
  fetchNextPage,
  listPins,
  isDetailLoading,
  roomId,
  isLoading,
  isFetchingNextPage
}: TProps) {
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const { userInfo } = useAuthStore(state => state);
  const { onReceiveMessageSocket } = useSocketChatMessage();
  const flashlistRef = useRef<FlashList<any>>(null);
  const messagesRef = useRef<TMessage[]>([])
  const [blankAreaTrackerResult, onBlankArea] =
    useBlankAreaTracker(flashlistRef);

  useEffect(() => {
    return () => {
      console.log('On blank area: ', blankAreaTrackerResult);
    };
  }, [blankAreaTrackerResult]);

  useEffect(() => {
    if (messages.length === 0) return;
    messagesRef.current = messages
  }, [messages])

  const onReceiveMessage = useCallback((data: any) => {

  }, []);
  useEffect(() => {
    onReceiveMessageSocket(onReceiveMessage);
  }, [onReceiveMessage, onReceiveMessageSocket]);
  const renderItem = useCallback(
    ({ item, index }: { item: TMessage; index: number }) => {
      const isMyMessage = item?.sender?._id === userInfo?._id;
      const justify = isMyMessage ? 'flex-end' : 'flex-start';
      let componentMessage: JSX.Element;
      const _isSameTime = !_format.isSameDay(item, messages?.[index + 1]);
      const props = {
        content: item?.content,
        justify,
        avatar: item?.sender?.avatar,
        isMyMessage,
        idMessage: item.idMessage,
        message: item,
        roomId,
        isPinMessage: item?.isPinMessage
      } as TMessageProps

      switch (item?.subType) {
        case TYPE_MESSAGE.UNPIN:
        case TYPE_MESSAGE.PIN:
          componentMessage = (
            <MessagePinOrUnPin message={item?.content} subType={item?.subType} />
          )
          break;
        case TYPE_MESSAGE.MEDIA:
          componentMessage = (
            <MessageMedia
              {...props}
            />
          )
          break;
        case TYPE_MESSAGE.CONTACT:
        case TYPE_MESSAGE.FILE:
          componentMessage = (
            <MessageFile
              {...props}
            />
          )
          break;
        case TYPE_MESSAGE.LOCATION:
          componentMessage = (
            <MessageLocation
              {...props}
            />
          )
          break;
        case TYPE_MESSAGE.RECOD:
          componentMessage = (
            <MessageRecording
              {...props}
            />
          )
          break;
        case TYPE_MESSAGE.REPLY:
          componentMessage = (
            <MessageReply
              {...props}
            />
          );
          break;
        default:
          componentMessage = (
            <MessageText
              {...props}
            />
          );
      }

      return (
        <>
          {_isSameTime && <MessageInfoAction time={item?.createdAt} />}
          {componentMessage}
        </>
      );
    },
    [messages, userInfo?._id, roomId],
  );
  const handleOnScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {
        nativeEvent: {
          contentOffset: { y: contentOffsetY },
        },
      } = event;
      if (contentOffsetY > responsiveHeight(600)!) {
        setShowScrollBottom(true);
      } else {
        setShowScrollBottom(false);
      }
    },
    [],
  );
  const handleLoadMore = useCallback(() => {
    if (isFetchingNextPage) return;
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage]);
  return (
    <>
      <ThreadMessagePin listPins={listPins} isDetailLoading={isDetailLoading} />
      <AppFlashlist
        flashlistRef={flashlistRef}
        data={messages as unknown as TMessage[]}
        renderItem={renderItem as ListRenderItem<TMessage | unknown>}
        isRefetching={false}
        refetch={() => { }}
        isLoading={false}
        estimatedItemSize={40}
        keyExtractor={(item: any, index) => index.toString()}
        getItemType={(item: any) => {
          return item?.subType;
        }}
        inverted
        refreshControl={undefined}
        scrollEventThrottle={100}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScroll={handleOnScroll}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        onBlankArea={onBlankArea}
      />
      {/* <ThreadMessageForward /> */}
      <ThreadMessageReply />
      {/* {showScrollBottom && (
       <ScrollToBottom onPress={() => flashlistRef.current?.scrollToOffset({animated: true, offset: 0})}/>
      )} */}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: responsiveHeight(12),
    paddingBottom: responsiveHeight(50)
  },
});
