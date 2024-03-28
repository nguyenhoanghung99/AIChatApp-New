import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {container} from 'tsyringe';
import {ColorSchemeName} from 'react-native';
import {StorageKeys} from '@/constants';
import {Storage} from '@/utilities';

type Props = {
  children: ReactNode;
};

export type ThemeContextState = {
  theme: ColorSchemeName;
  setTheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>;
  loading: boolean;
};
const storage = container.resolve(Storage);

export const ThemeContext = React.createContext<ThemeContextState | null>(null);
export default function ModeThemeProvider({children}: Props) {
  const [theme, setTheme] = useState<ColorSchemeName>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      const storedTheme = storage.getItem(
        StorageKeys.THEME_ASYNC_STORAGE_KEY,
      ) as ColorSchemeName;
      setTheme(storedTheme ?? 'light');
      setLoading(false);
    };
    load();
  }, []);
  useEffect(() => {
    if (theme) {
      storage.setItem(StorageKeys.THEME_ASYNC_STORAGE_KEY, theme);
    } else {
      storage.removeItem(StorageKeys.THEME_ASYNC_STORAGE_KEY);
    }
  }, [theme]);

  const contextState = useMemo(
    () => ({loading, setTheme, theme}),
    [theme, loading],
  );

  if (loading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextState}>
      {children}
    </ThemeContext.Provider>
  );
}
