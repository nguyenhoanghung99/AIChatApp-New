import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores';

export const useStatusMessageChannel = ({
  members,
  initMessageGroup,
  lastMessage,
  member
}: TRoom) => {
  const { userInfo } = useAuthStore(state => state);
  const { t } = useTranslation();
  const findMemberResult = useMemo(() => {
    const findMember = members?.find(member => member?._id !== userInfo?._id);
    return {
      currentChannel: findMember?.fullName,
      currentAvatar: findMember?.avatar,
      currentUserId: findMember?._id,
    };
  }, [members, userInfo?._id]);
  const findAdminGroup = useMemo(() => {
    const findAdmin = members?.find(member => member?.roleRoom === 'admin');
    return {
      adminId: findAdmin?._id,
      adminName: findAdmin?.fullName,
      ...(initMessageGroup
        ? {
          lastMessageGroup:
            userInfo?._id === findAdmin?._id && initMessageGroup
              ? `${t('You')} ${initMessageGroup}`
              : `${findAdmin?.fullName} ${initMessageGroup}`,
        }
        : {
          lastMessageGroup: lastMessage?.content,
        }),
    };
  }, [initMessageGroup, lastMessage?.content, members, t, userInfo?._id]);
  const numberBadge = useMemo(() => {
    return Number(member?.[userInfo?._id] as any)
  }, [userInfo?._id, member])
  return {
    ...findMemberResult,
    ...findAdminGroup,
    numberBadge
  };
};
