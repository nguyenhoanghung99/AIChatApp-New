import { useEffect } from 'react';
import { NativeModules } from 'react-native';
import { container } from 'tsyringe';
import { StorageKeys } from '@/constants';
import { useUpdateTranslate } from '@/hooks';
import { isIOS } from '@/themes';
import { Storage } from '@/utilities';
const storage = container.resolve(Storage)
export const useLocale = () => {
  const { updateTranslate, isLoading } = useUpdateTranslate();
  useEffect(() => {
    (async () => {
      const current = storage.getItem(StorageKeys.LOCALE_LANGUAGE);
      if (!current) {
        const deviceLanguage = isIOS
          ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
          : NativeModules.I18nManager.localeIdentifier;
        if (deviceLanguage?.substring(0, 2)) {
          const language = deviceLanguage?.substring(0, 2);
          storage.setItem(StorageKeys.LOCALE_LANGUAGE, language)
          updateTranslate(language);
        }
        return
      } else {
        updateTranslate(current);
      }

    })();
  }, [updateTranslate]);

  return {
    isLoading
  }
};
