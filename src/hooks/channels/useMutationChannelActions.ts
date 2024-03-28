import {ToastAndroid} from 'react-native';
import {useCallback} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {MutationKeys, QueryKeys} from '@/constants';
import {ChannelService} from '@/services';

export const useMutationChannelActions = () => {
  const queryClient = useQueryClient();
  const {mutate: mutateAddFriend, isPending: isAddFriendPending} = useMutation({
    mutationKey: [MutationKeys.ADD_FRIEND],
  });
  const {mutate: mutateBlockFriend, isPending: isBlockFriendPending} =
    useMutation({
      mutationKey: [MutationKeys.BLOCK_FRIEND],
    });
  const {mutate: mutateUnFriend, isPending: isUnFriendPending} = useMutation({
    mutationKey: [MutationKeys.UN_FRIEND],
  });
  const {mutate: mutateMute, isPending: isMutePending} = useMutation<
    any,
    any,
    TChannelActionForm
  >({
    mutationKey: [MutationKeys.MUTE],
    mutationFn: form => ChannelService.muteChannel(form),
  });
  const {mutate: mutatePin, isPending: isPinPending} = useMutation<
    any,
    any,
    TChannelActionForm
  >({
    mutationKey: [MutationKeys.PIN],
    mutationFn: form => ChannelService.pinChannel(form),
  });
  const {mutate: mutateRevoke, isPending: isRevokePending} = useMutation({
    mutationKey: [MutationKeys.REVOKE],
  });

  const {mutate: mutationCreateChannel, isPending: isCreateChannelPending} =
    useMutation({
      mutationKey: [MutationKeys.CREATE_CHANNEL],
      mutationFn: (form: TCreateChannel) => ChannelService.createChannel(form),
    });

  const onCreateChannel = useCallback(
    (form: TCreateChannel, cb?: () => void) => {
      mutationCreateChannel(form, {
        onError: (error: Error) => {
          console.log('Create Channel error', error);
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        },
        onSuccess: async (data: TResponse<any>) => {
          if (data?.statusCode === 200) {
            console.log('CREATE CHANNEL SUCCESS', data);
            cb?.();
          }
        },
      });
    },
    [],
  );

  const onChannelActionAddFriend = useCallback(() => {
    mutateAddFriend();
  }, [mutateAddFriend]);
  const onChannelActionBlockFriend = useCallback(() => {
    mutateBlockFriend();
  }, [mutateBlockFriend]);
  const onChannelActionUnFriend = useCallback(() => {
    mutateUnFriend();
  }, [mutateUnFriend]);
  const onChannelActionPin = useCallback(
    (form: TChannelActionForm, cb: () => void) => {
      mutatePin(form, {
        onError: error => {
          console.log('error', error);
        },
        onSuccess: data => {
          queryClient.setQueryData(
            [QueryKeys.LIST_CHANNELS, {limit: 10, page: 1}],
            (oldData: any) => ({
              ...oldData,
              pages: oldData.pages.map((item: TListResponse<TRoom>) => ({
                ...item,
                data: item.data.map(channel => ({
                  ...channel,
                  isPin:
                    channel._id === form.roomId
                      ? !channel.isPin
                      : channel.isPin,
                })),
              })),
            }),
          );
          cb();
        },
      });
    },
    [mutatePin],
  );
  const onChannelActionMute = useCallback(
    (form: TChannelActionForm, cb: () => void) => {
      mutateMute(form, {
        onError: error => {
          console.log('error', error);
        },
        onSuccess: data => {
          queryClient.setQueryData(
            [QueryKeys.LIST_CHANNELS, {limit: 10, page: 1}],
            (oldData: any) => ({
              ...oldData,
              pages: oldData.pages.map((item: TListResponse<TRoom>) => ({
                ...item,
                data: item.data.map(channel => ({
                  ...channel,
                  isMute:
                    channel._id === form.roomId
                      ? !channel.isMute
                      : channel.isMute,
                })),
              })),
            }),
          );
          cb();
        },
      });
    },
    [mutateMute],
  );
  const onChannelActionRevoke = useCallback(() => {
    mutateRevoke();
  }, [mutateRevoke]);
  return {
    onCreateChannel,
    onChannelActionAddFriend,
    onChannelActionBlockFriend,
    onChannelActionUnFriend,
    onChannelActionPin,
    onChannelActionMute,
    onChannelActionRevoke,
    isPending:
      isAddFriendPending ||
      isBlockFriendPending ||
      isUnFriendPending ||
      isMutePending ||
      isPinPending ||
      isRevokePending ||
      isCreateChannelPending,
  };
};
