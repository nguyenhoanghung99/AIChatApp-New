import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKeys } from "@/constants";
import { FriendService } from "@/services";

export const useMutationFriend = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateRevoke, isPending: isRevokePending } = useMutation<any, any, { requestId: string }>({
    mutationKey: [MutationKeys.REVOKE],
    mutationFn: ({ requestId }) => FriendService.revokeFriend(requestId),
  });
  const { mutate: mutateAddFriend, isPending: isAddFriendPending } = useMutation<any, any, TAddFriendForm>({
    mutationKey: [MutationKeys.ADD_FRIEND],
    mutationFn: (form) => FriendService.addFriend(form),
  });
  const { mutate: mutateBlockFriend, isPending: isBlockFriendPending } =
    useMutation<any, any, TFriendForm>({
      mutationKey: [MutationKeys.BLOCK_FRIEND],
      mutationFn: (form) => FriendService.blockFriend(form),
    });
  const { mutate: mutateUnBlockFriend, isPending: isUnBlockFriendPending } =
    useMutation<any, any, TFriendForm>({
      mutationKey: [MutationKeys.UN_BLOCK_FRIEND],
      mutationFn: (form) => FriendService.unBlockFriend(form),
    });
  const { mutate: mutateUnFriend, isPending: isUnFriendPending } = useMutation<any, any, TFriendForm>({
    mutationKey: [MutationKeys.UN_FRIEND],
    mutationFn: (form) => FriendService.unFriend(form),
  });
  const { mutate: mutateAcceptFriend, isPending: isAcceptFriendPending } = useMutation<any, any, TAcceptForm>({
    mutationKey: [MutationKeys.ACCEPT_FRIEND],
  });

  const onActionRevoke = useCallback(({ requestId }: { requestId: string }) => {
    mutateRevoke({ requestId }, {
      onError: (error) => {
        console.log('error', error)
      },
      onSuccess: (data) => {
        console.log('data', data)
      },
    });
  }, [mutateRevoke]);

  const onActionAddFriend = useCallback((form: TAddFriendForm) => {
    mutateAddFriend(form, {
      onError: (error) => {
        console.log('error', error)
      },
      onSuccess: (data) => {
        console.log('data', data)
      },
    });
  }, [mutateAddFriend]);
  const onActionBlockFriend = useCallback((form: TFriendForm) => {
    mutateBlockFriend(form, {
      onError: (error) => {
        console.log('error', error)
      },
      onSuccess: (data) => {
        console.log('data', data)
      },
    });
  }, [mutateBlockFriend]);
  const onActionUnFriend = useCallback((form: TFriendForm) => {
    mutateUnFriend(form, {
      onError: (error) => {
        console.log('error', error)
      },
      onSuccess: (data) => {
        console.log('data', data)
      },
    });
  }, [mutateUnFriend]);
  const onActionUnBlockFriend = useCallback((form: TFriendForm) => {
    mutateUnBlockFriend(form, {
      onError: (error) => {
        console.log('error', error)
      },
      onSuccess: (data) => {
        console.log('data', data)
      },
    });
  }, [mutateUnBlockFriend]);

  const onActionAcceptFriend = useCallback((form: TAcceptForm) => {
    mutateAcceptFriend(form, {
      onError: (error) => {
        console.log('error', error)
      },
      onSuccess: (data) => {
        console.log('data', data)
      },
    });
  }, [mutateAcceptFriend]);

  return {
    onActionAddFriend,
    onActionBlockFriend,
    onActionUnFriend,
    onActionRevoke,
    onActionUnBlockFriend,
    onActionAcceptFriend,
    isFriendPending: isRevokePending ||
      isAddFriendPending ||
      isBlockFriendPending ||
      isUnBlockFriendPending ||
      isUnFriendPending ||
      isAcceptFriendPending,
  }
}
