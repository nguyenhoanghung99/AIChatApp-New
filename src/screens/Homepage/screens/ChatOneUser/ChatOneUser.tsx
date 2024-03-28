import React, {useEffect, useRef} from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {
  AppChatHeader,
  AppSafeAreaView,
  AppView,
  ListChatMessages,
  MessageEmpty,
  MessageNoFriendEmpty,
  ModalMediaSelect,
  RequestAddFriend,
  SendMessage,
  ModalRecording,
  AppChooseMedia,
} from '@/components';
import {useQueryClient} from '@tanstack/react-query';
import {EventSocketType, QueryKeys, TYPE_MESSAGE} from '@/constants';
import {AppStackParamList} from '@/navigator/types';
import {
  useDetailChatMessage,
  useListMessages,
  useMutationChannelActions,
  useSocket,
} from '@/hooks';
import {BaseStyles, isIOS, responsiveHeight} from '@/themes';
import {useAuthStore} from '@/stores';
import {Routes} from '@/navigator';

export default function ChatOneUser() {
  const {params} = useRoute<RouteProp<AppStackParamList, 'ChatOneUser'>>();
  const {onCreateChannel} = useMutationChannelActions();
  const {listPins, isDetailLoading, members} = useDetailChatMessage(
    params?.roomId!,
  );
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const {
    messages,
    params: messageParams,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useListMessages(params?.roomId!);

  useEffect(() => {
    if (params?.screen === Routes.SearchResult) {
      onCreateChannel({members: [params?.idUser!]});
    }
  }, []);

  const {socket} = useSocket();
  const refModalMedia = useRef<TModalRef>(null);
  const refModalRecording = useRef<TModalRef>(null);
  const queryClient = useQueryClient();
  const {userInfo} = useAuthStore(state => state);

  useEffect(() => {
    socket?.on(EventSocketType.RECEIVE_GROUP_CHAT, mess =>
      _handleReceiveMessage(mess),
    );
    socket?.emit(EventSocketType.JOIN_GROUP_CHAT, {roomId: params?.roomId});
    return () => {
      socket?.emit(EventSocketType.OUT_GROUP_CHAT, {roomId: params?.roomId});
    };
  }, [socket]);

  useEffect(() => {
    socket?.on(EventSocketType.RECEIVE_SEND_REACTIONS, res => {
      const response = JSON.parse(res);
      switch (response?.subType) {
        case TYPE_MESSAGE.PIN:
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.DETAIL_CHAT_MESSAGE, params.roomId],
            exact: true,
            refetchType: 'active',
          });
          break;
        case TYPE_MESSAGE.UNPIN:
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.DETAIL_CHAT_MESSAGE, params.roomId],
            exact: true,
            refetchType: 'active',
          });
          break;
        case TYPE_MESSAGE.UNSEND:
          break;
        default:
          break;
      }
    });
  }, [socket]);

  const _handleReceiveMessage = (mess: TMessage) => {
    console.log(mess.sender?.id, userInfo.id);
    if (mess?.sender?._id === userInfo?._id) return;
    queryClient.setQueryData(
      [QueryKeys.LIST_MESSAGES, params?.roomId],
      (oldData: any) => {
        const results = oldData.pages.map((item: any) => {
          return {
            ...item,
            data: [mess, ...item.data],
          };
        });
        return {
          pages: [...results],
          pageParams: [...oldData.pageParams],
        };
      },
    );
  };

  return (
    <AppSafeAreaView backgroundColor="bgBlack" flex={1} edges={['top']}>
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={BaseStyles.flex1}
        keyboardVerticalOffset={
          isIOS ? -responsiveHeight(20) : -responsiveHeight(80)
        }
        style={[BaseStyles.flex1]}>
        <AppChatHeader
          avatar={params?.avatar}
          title={params?.roomName}
          type={params?.type}
        />
        <RequestAddFriend
          members={members!}
          isDetailLoading={isDetailLoading}
        />
        <AppView flex={1} backgroundColor="neutralGrey5">
          <ListChatMessages
            messages={messages}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            listPins={listPins!}
            isDetailLoading={isDetailLoading}
            roomId={params?.roomId!}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
          />
        </AppView>
        <SendMessage
          roomId={params?.roomId!}
          params={messageParams}
          openMedia={() => bottomSheetRef.current?.onOpenBotSheet()}
          openRecording={() => refModalRecording.current?.onShow()}
        />
        {/* <ModalMediaSelect ref={refModalMedia} roomId={params?.roomId} /> */}
        {/* <AppChooseMedia ref={bottomSheetRef} /> */}
        {/* <BlockMessageUser /> */}
      </KeyboardAvoidingView>
      <ModalRecording ref={refModalRecording} roomId={params?.roomId!} />
    </AppSafeAreaView>
  );
}
