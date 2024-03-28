import { useQueryClient } from "@tanstack/react-query"
import i18next from "i18next"
import { useCallback, useState } from "react"
import { container } from "tsyringe"
import { QueryKeys, StorageKeys } from "@/constants"
import { SettingService } from "@/services"
import { Storage } from "@/utilities"
import { useLanguageStore } from "@/stores"
const storage = container.resolve(Storage)

export const useUpdateTranslate = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false)
  const { setLanguage } = useLanguageStore(state => state);
  const updateTranslate = useCallback(async (language: string) => {
    setIsLoading(true)
    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: [QueryKeys.LIST_JSON_LANGUAGE, language],
        queryFn: () => SettingService.getJsonLanguage(language),
      })
      if (data?.data) {
        storage.setItem(StorageKeys.JSON_LANGUAGE, JSON.stringify(data.data))
        storage.setItem(StorageKeys.LOCALE_LANGUAGE, data?.language);
        setLanguage(data.country)
        await i18next.addResourceBundle(
          data?.language,
          'translations',
          data.data,
          true,
          true,
        );
        i18next.loadNamespaces('translations');
        await i18next.changeLanguage(language);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    updateTranslate,
    isLoading
  }
}