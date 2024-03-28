import uuid from 'react-native-uuid';
import dayjs from "dayjs";
import { useAuthStore } from "@/stores";

export const useUserSender = () => {
  const { userInfo } = useAuthStore(state => state);
  return {
    userId: userInfo?._id,
    sender: {
      id: uuid.v4() as string,
      _id: uuid.v4() as string,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      isDeleted: false,
      isLike: false,
      isPinMessage: false,
      type: "USER",
      sender: {
        id: userInfo?._id,
        _id: userInfo?._id,
        fullName: userInfo?.fullName,
        avatar: userInfo?.avatar,
        role: userInfo?.role,
      },
    }
  }
}
