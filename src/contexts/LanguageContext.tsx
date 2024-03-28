import {StorageKeys} from '@/constants';
import i18n from '@/translations';
import {Storage} from '@/utilities';
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {container} from 'tsyringe';

const LanguageContext = createContext<{
  language: string;
  onChangeLanguage: (lang: string) => void;
  i18n: typeof i18n;
}>({
  language: 'en',
  onChangeLanguage: (lang: string) => {},
  i18n,
});
const storage = container.resolve(Storage);

const LanguageProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const [language, setLanguage] = useState<string>('en');

  const initLanguage = useCallback(async () => {
    const lang = storage.getItem(StorageKeys.LOCALE_LANGUAGE);
    if (lang !== null) {
      setLanguage(lang as string);
    }
  }, []);

  useEffect(() => {
    initLanguage();
  }, [initLanguage]);

  const onChangeLanguage = useCallback(async (lang: string) => {
    storage.setItem(StorageKeys.LOCALE_LANGUAGE, lang);
    // i18n.locale = lang;
    setLanguage(lang);
  }, []);

  const value = useMemo(
    () => ({i18n, t: i18n.t, language, onChangeLanguage}),
    [language, onChangeLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguages = () => {
  const values = useContext(LanguageContext);

  return values;
};

export default LanguageProvider;
