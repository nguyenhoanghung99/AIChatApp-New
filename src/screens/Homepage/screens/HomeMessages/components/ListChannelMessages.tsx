import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListRenderItem } from '@shopify/flash-list';
import { AppFlashlist, AppSwipeable, AppView } from '@/components';
import { navigate } from '@/navigator/NavigationService';
import { Routes } from '@/navigator/Routes';
import { ChannelDefaultMessage, ChannelMessage } from '@/screens';
import { Swipeable } from 'react-native-gesture-handler';
import { useListChannels, useRefreshOnFocus, useSocket, useUserSender } from '@/hooks';
import { EventSocketType, QueryKeys, TYPE_MESSAGE } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

export default function ListChannelMessages() {
  const queryClient = useQueryClient();
  const { userId } = useUserSender();
  const {
    fetchNextPage,
    channels,
    refetch,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    params
  } = useListChannels();
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on(EventSocketType.RECEIVE_SEND_REACTIONS, res => {
      const response = JSON.parse(res);
      switch (response?.subType) {
        case TYPE_MESSAGE.PIN:
        case TYPE_MESSAGE.UNPIN:
        case TYPE_MESSAGE.UNSEND:
          refetch();
        default:
          break;
      }
    });
    return () => {
      socket.off(EventSocketType.RECEIVE_SEND_REACTIONS)
    }
  }, [socket])
  useEffect(() => {
    socket?.on(EventSocketType.RECEIVE_GROUP_CHAT, (res: any) => {
      if (res?.sender?._id === userId) return;
      queryClient.setQueryData([QueryKeys.LIST_CHANNELS, params], (oldData: any) => ({
        ...oldData,
        pages: oldData.pages.map((item: TListResponse<TRoom>) => ({
          ...item,
          data: item.data.map((data) => ({
            ...data,
            lastSent: data?._id === res?.room?.id ? dayjs().toISOString() : data.lastSent,
            lastMessage: data?._id === res?.room?.id ? res : data.lastMessage
          }))
        }))
      }))
    });
    return () => {
      socket.off(EventSocketType.RECEIVE_GROUP_CHAT);
    }
  }, [socket])

  useRefreshOnFocus(refetch);
  const { t } = useTranslation();
  const swipeRef = useRef<Swipeable | null>(null);
  const messageDefaults = useMemo(() => {
    return [
      {
        title: t('Friendify AI'),
        content: t(
          'Lorem ipsum dolor sit amet consectetur. Et a pellentesque amet donec venenatis faucibus donec dolor.',
        ),
        onPress: () => navigate(Routes.FriendifyAi),
        isSeeAll: true,
        backgroundColor: 'lightLink'
      },
      {
        title: t('My Cloud'),
        content: t(
          'Lorem ipsum dolor sit amet consectetur. Et a pellentesque amet donec venenatis faucibus donec dolor.',
        ),
        onPress: () => navigate(Routes.MyCloud),
        backgroundColor: 'cloud'
      },
    ] as TDefaultChannel[];
  }, [t]);
  const renderItem = useCallback(({ item }: { item: TRoom }) => {
    return (
      <AppSwipeable
        _swipeRef={swipeRef}
        isPin={item?.isPin}
        isMute={item?.isMute}
        roomId={item?._id}>
        <ChannelMessage {...item} />
      </AppSwipeable>
    );
  }, []);
  const listHeaderComponent = useCallback(() => {
    return messageDefaults.map((item: TDefaultChannel, index) => (
      <ChannelDefaultMessage key={index} {...item} />
    ));
  }, [messageDefaults]);
  return (
    <AppView flex={1} backgroundColor="neutralGrey5">
      <AppFlashlist
        data={channels}
        renderItem={renderItem as ListRenderItem<TRoom | unknown>}
        estimatedItemSize={200}
        ListHeaderComponent={listHeaderComponent}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        isRefetching={isRefetching}
        refetch={refetch}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        keyExtractor={(item: any) => item?.id?.toString()}
      />
    </AppView>
  );
}
