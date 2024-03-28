import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  AppChatHeader,
  AppSafeAreaView,
  AppView,
  ListChatMessages,
  SendMessageGroup,
} from '@/components';
import { AppStackParamList } from '@/navigator/types';
import { useDetailChatMessage, useListMessages } from '@/hooks';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { BaseStyles } from '@/themes';
import { useAuthStore } from '@/stores';

export default function ChatGroupUser() {
  const { params } = useRoute<RouteProp<AppStackParamList, 'ChatGroupUser'>>();
  const { userInfo } = useAuthStore(state => state);
  const { t } = useTranslation();
  const { listPins, isDetailLoading } = useDetailChatMessage(params?.roomId)
  const {
    messages,
    params: messageParams,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage
  } = useListMessages(params?.roomId);
  const listMentions = useMemo(() => {
    return params?.members.filter(member => member._id !== userInfo?._id);
  }, [params?.members, userInfo?._id]);
  return (
    <AppSafeAreaView backgroundColor="bgBlack" flex={1} edges={['top']}>
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={BaseStyles.flex1}
        keyboardVerticalOffset={-20}
        style={[BaseStyles.flex1]}>
        <AppChatHeader
          avatar={params?.avatar}
          title={params?.roomName}
          member={`${params?.members?.length} ${t('Memebers')}`}
          type={params?.type}
        />
        <AppView flex={1} backgroundColor="neutralGrey5">
          <ListChatMessages
            messages={messages}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            listPins={listPins!}
            isDetailLoading={isDetailLoading}
            roomId={params?.roomId}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
          />
        </AppView>
        <SendMessageGroup listMentions={listMentions} params={messageParams} />
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
}
