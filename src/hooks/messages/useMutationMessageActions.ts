import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import uuid from 'react-native-uuid';
import dayjs from 'dayjs';
import { EMediaType, MutationKeys, QueryKeys, TYPE_MESSAGE } from '@/constants';
import { MessageService } from '@/services';
import { EXTENTION_VIDEO, useSocketChatMessage } from '@/hooks';
import { useAuthStore } from '@/stores';
export const useMutationMessageActions = () => {
  const { onSendMessageSocket } = useSocketChatMessage();
  const { userInfo } = useAuthStore(state => state);
  const queryClient = useQueryClient();

  const { mutate: mutateMute, isPending: isMutePending } = useMutation({
    mutationKey: [MutationKeys.MESSAGE_MUTE],
  });
  const { mutate: mutateUnMute, isPending: isUnMutePending } = useMutation({
    mutationKey: [MutationKeys.MESSAGE_UNMUTE],
  });
  const { mutate: mutatePin, isPending: isPinPending } = useMutation<any, any, TPinMessageForm>({
    mutationKey: [MutationKeys.MESSAGE_PIN],
    mutationFn: (form) => MessageService.pinMessage(form)
  });
  const { mutate: mutateUnPin, isPending: isUnPinPending } = useMutation<any, any, TPinMessageForm>({
    mutationKey: [MutationKeys.MESSAGE_UNPIN],
    mutationFn: (form) => MessageService.unPinMessage(form)
  });
  const { mutate: mutateSendMedia, isPending: isSendMediaPending } = useMutation({
    mutationKey: [MutationKeys.SEND_MEDIA],
    mutationFn: (data: FormData) => MessageService.sendMedia(data),
  });

  const { mutate: mutateUnsend, isPending: isUnsendPending } = useMutation<any, any, TUnSendMessageForm>({
    mutationKey: [MutationKeys.MESSAGE_UNSEND],
    mutationFn: (form) => MessageService.unSendMessage(form),
  })
  const { mutate: mutateReport, isPending: isReportPending } = useMutation({
    mutationKey: [MutationKeys.MESSAGE_REPORT],
  })

  const onMessageActionPin = useCallback((form: TPinMessageForm, isPin: boolean, cb: () => void) => {
    if (isPin) {
      mutateUnPin(form, {
        onError: (error) => {
          console.log('onMessageActionUnPin error', error);
        },
        onSuccess: (data) => {
          queryClient.setQueryData([QueryKeys.LIST_MESSAGES, form.roomId], (oldData: any) => ({
            ...oldData,
            pages: oldData.pages.map((item: TListResponse<TMessage>) => ({
              ...item,
              data: item.data.map((message) => ({
                ...message,
                isPinMessage: message.idMessage === data?.data?.idMessage ? false : message.isPinMessage,
              })),
            })),
          }));
          queryClient.setQueryData([QueryKeys.DETAIL_CHAT_MESSAGE, form.roomId], (oldData: any) => ({
            ...oldData, data: {
              ...oldData.data,
              listPins: oldData.data.listPins.filter((item: TMessagePin) => item.idMessage !== data.data?.idMessage)
            }
          }))
          onSendMessageSocket({
            content: `${userInfo?.fullName} unpin a message`,
            subType: TYPE_MESSAGE.UNPIN,
            idMessage: uuid.v4() as string,
            roomId: form.roomId,
            tag: [],
            caption: ''
          })
          cb();
        }
      });
      return
    }
    mutatePin(form, {
      onError: (error) => {
        console.log('onMessageActionPin error', error);
      },
      onSuccess: (data) => {
        queryClient.setQueryData([QueryKeys.LIST_MESSAGES, form.roomId], (oldData: any) => ({
          ...oldData,
          pages: oldData.pages.map((item: TListResponse<TMessage>) => ({
            ...item,
            data: item.data.map((message) => ({
              ...message,
              isPinMessage: message.idMessage === data?.data?.idMessage ? true : message.isPinMessage,
            })),
          })),
        }));
        queryClient.setQueryData([QueryKeys.DETAIL_CHAT_MESSAGE, form.roomId], (oldData: TResponse<TDetailMessage>) => ({
          ...oldData, data: {
            ...oldData.data,
            listPins: [data.data, ...oldData.data.listPins]
          }
        }))
        onSendMessageSocket({
          content: `${userInfo?.fullName} pin a message`,
          subType: TYPE_MESSAGE.PIN,
          idMessage: uuid.v4() as string,
          roomId: form.roomId,
          tag: [],
          caption: ''
        })
        cb();
      }
    });
  }, [mutatePin, mutateUnPin, queryClient, userInfo?.fullName]);
  const onMessageActionMute = useCallback(() => {
    mutateMute();
  }, [mutateMute]);
  const onMessageActionUnMute = useCallback(() => {
    mutateUnMute();
  }, [mutateUnMute]);

  const onMessageActionSendMedia = useCallback(
    (data: FormData, form: TSendMessageSocket) => {
      mutateSendMedia(data, {
        onSuccess: (res: any) => {
          console.log('resss', res)
          const _content = {
            data: res.data?.map((rs: { url: string; }) => {
              let typeMessage = form.subType;
              if (form.subType === TYPE_MESSAGE.MEDIA) {
                typeMessage = EXTENTION_VIDEO.includes(rs.url?.split('.').pop()?.toUpperCase() ?? '') ? EMediaType.VIDEO : EMediaType.IMAGE
              }
              return {
                url: rs.url,
                type: typeMessage,
              }
            }),
            caption: form.caption
          };
          const message = {
            ...form,
            content: JSON.stringify(_content),
          }
          onSendMessageSocket(message);
        },
        onError(error) {
          console.log('----onMessageActionSendMediaError', error);
        },
      });
    },
    [mutateSendMedia],
  );

  const setDataMessageLocal = useCallback((form: any, roomId: any) => {
    queryClient.setQueryData(
      [QueryKeys.LIST_MESSAGES, roomId],
      (oldData: any) => {
        const results = oldData.pages.map((item: any) => {
          return {
            ...item,
            data: [
              {
                ...form,
                id: uuid.v4() as string,
                _id: uuid.v4() as string,
                createdAt: dayjs().valueOf(),
                updatedAt: dayjs().valueOf(),
                sender: {
                  id: userInfo?._id,
                  _id: userInfo?._id,
                  fullName: userInfo?.fullName,
                  avatar: userInfo?.avatar,
                  role: userInfo?.role,
                },
              },
              ...item.data,
            ],
          };
        });
        return {
          pages: [...results],
          pageParams: [...oldData.pageParams],
        };
      },
    );
  }, []);

  const onMessageActionUnsend = useCallback((form: TUnSendMessageForm, cb: () => void) => {
    console.log(form);
    mutateUnsend(form, {
      onError: (error) => {
        console.log('onError', error)
      },
      onSuccess: (data) => {
        console.log('onSuccess', data)
        cb();
      }
    });
  }, [mutateUnsend]);
  const onMessageActionReport = useCallback(() => {
    mutateReport();
  }, [mutateReport]);
  const onActionUnBlockFriend = useCallback(() => {
    mutateReport();
  }, [mutateReport]);
  return {
    onMessageActionPin,
    onMessageActionMute,
    onMessageActionUnMute,
    onMessageActionSendMedia,
    onMessageActionUnsend,
    onMessageActionReport,
    setDataMessageLocal,
    isPending:
      isMutePending ||
      isUnMutePending ||
      isPinPending ||
      isUnPinPending ||
      isSendMediaPending ||
      isUnsendPending ||
      isReportPending,
  };
};
