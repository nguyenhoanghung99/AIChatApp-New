import React, { useMemo } from 'react';
import { AppBackHeader, AppScrollView, AppView } from '@/components';
import { BlockProfileUser, SettingMenu } from '@/screens';
import { Icons, responsiveHeight } from '@/themes';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { MENU_SETINGS, MENU_SETINGS_BOTTOM } from '@/utilities';
import { useLanguageStore } from '@/stores';
import { Routes } from '@/navigator';

export default function Setting({ ...props }: DrawerContentComponentProps) {
  const { language } = useLanguageStore(state => state)
  const settings = useMemo(() => {
    return [
      ...MENU_SETINGS,
      {
        title: 'Language',
        color: 'colorBF',
        subTitle: language?.name ?? 'English',
        icon: Icons.language,
        screen: Routes.Language
      },
      {
        color: 'lightLink',
        title: 'Appearance',
        subTitle: 'Light',
        icon: Icons.Appearance,
        screen: Routes.Appearance
      },
      ...MENU_SETINGS_BOTTOM
    ]
  }, [language])
  return (
    <AppBackHeader title='Settings'
      icon={Icons.Close}
    >
      <BlockProfileUser />
      <AppScrollView
        showsVerticalScrollIndicator={false}
        paddingTop='lg'
        flex={1}
      >
        {settings.map((item, index) => {
          return <SettingMenu item={item} key={`MENU_SETINGS_${item.screen}`} />;
        })}
        <AppView height={responsiveHeight(40)} />
      </AppScrollView>
    </AppBackHeader>
  );
}
