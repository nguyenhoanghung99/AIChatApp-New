import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "@/constants"
import { SettingService } from "@/services"

export const useListLanguage = () => {
  const {data, isLoading, refetch, isFetching} = useQuery({
    queryKey: [QueryKeys.LIST_LANGUAGE],
    queryFn: () => SettingService.getListLanguage()
  })
  return {
    data: data?.data ?? [],
    isLoading,
    refetch, 
    isFetching
  }
}