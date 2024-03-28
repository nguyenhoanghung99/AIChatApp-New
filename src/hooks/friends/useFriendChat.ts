import { useMemo } from "react";
import { useAuthStore } from "@/stores";

type TProps = {
  members: TMembers[]
}
export const useFriendChat = ({ members }: TProps) => {
  const { userInfo } = useAuthStore(state => state);
  const findMemberResult = useMemo(() => {
    const findMember = members?.find(member => member?._id !== userInfo?._id);
    return {
      friendName: findMember?.fullName,
      friendAvatar: findMember?.avatar,
      friendId: findMember?._id,
      friendship: findMember?.friendship
    };
  }, [members, userInfo?._id]);

  const findMeResult = useMemo(() => {
    const findMe = members?.find(member => member?._id === userInfo?._id);
    return {
      myFriendship: findMe?.friendship
    }
  }, [members, userInfo?._id])

  return {
    ...findMemberResult,
    ...findMeResult
  }
}