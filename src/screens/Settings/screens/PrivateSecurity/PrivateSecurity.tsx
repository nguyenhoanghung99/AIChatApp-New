import React from 'react';
import {Switch} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

import {AppSafeAreaView, AppView} from '@/components';
import ScreenHeader from '@/components/AppHeader/ScreenHeader';

import {MenuPrivacySecutity} from './const';
import MenuPrivacySecurityItem from './Widget/MenuPrivacySecurityItem';
import {EMenuTitle} from './type';

export default function PrivateSecurity() {
  const {t} = useTranslation();

  const handleToggleShowOnlineStatus = (e: any) => {
    console.log(e);
  };

  return (
    <AppSafeAreaView flex={1}>
      <ScreenHeader
        title={t('Privacy & Security')}
      />
      <AppView
        paddingHorizontal="base"
        backgroundColor="neutralGrey5"
        padding="base">
        <AppView backgroundColor="white" borderRadius="sm">
          {MenuPrivacySecutity.map((item, i) => {
            return (
              <MenuPrivacySecurityItem
                isShowBorder={!(MenuPrivacySecutity.length === i + 1)}
                optionalRightItem={
                  item.title === EMenuTitle.ShowOnlineStatus && (
                    <Switch
                      onValueChange={handleToggleShowOnlineStatus}
                      value={false}
                    />
                  )
                }
                // @ts-ignore
                onPress={() => navigationRef.navigate(item.routeName)}
                key={item.id}
                item={item}
              />
            );
          })}
        </AppView>
      </AppView>
    </AppSafeAreaView>
  );
}
