import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "@/constants"
import { MessageService } from "@/services"

export const useDetailChatMessage = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.DETAIL_CHAT_MESSAGE, id],
    queryFn: () => MessageService.getDetailMessage({ id }),
    enabled: !!id
  })
  console.log("useDetailChatMessage", data);
  return {
    ...data?.data,
    isDetailLoading: isLoading
  }
}