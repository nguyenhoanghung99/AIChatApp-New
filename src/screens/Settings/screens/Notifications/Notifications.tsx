import React from 'react';
import {useTranslation} from 'react-i18next';
import {Switch} from 'react-native-gesture-handler';

import {AppSafeAreaView, AppText, AppView} from '@/components';
import ScreenHeader from '@/components/AppHeader/ScreenHeader';
import AppScrollView from '@/components/AppScrollView/AppScrollView';

import {responsiveHeight} from '@/themes';

import {ListNotificationType} from './const';

export default function Notifications() {
  const {t} = useTranslation();

  const handleToggleNotifications = (e: any) => {
    console.log(e);
  };

  return (
    <AppSafeAreaView flex={1}>
      <ScreenHeader
        title={t('Account')}
      />
      <AppView
        height={responsiveHeight(720)}
        paddingHorizontal="base"
        backgroundColor="neutralGrey5"
        padding="base">
        <AppScrollView showsVerticalScrollIndicator={false}>
          <AppView gap="xxl">
            {ListNotificationType.map((item, i) => {
              return (
                <AppView key={i} gap="xxs">
                  {item.headerSection && (
                    <AppText variant="baseSemiBold" color="neutralGrey7">
                      {item.headerSection}
                    </AppText>
                  )}
                  <AppView backgroundColor="white" borderRadius="sm">
                    {item.notiType.map(notiTypeItem => {
                      return (
                        <AppView
                          padding="xs"
                          justifyContent="space-between"
                          alignItems="center"
                          flexDirection="row">
                          <AppText color="neutralGrey9">
                            {notiTypeItem.title}
                          </AppText>
                          <Switch
                            onValueChange={handleToggleNotifications}
                            value={notiTypeItem.status}
                          />
                        </AppView>
                      );
                    })}
                  </AppView>
                </AppView>
              );
            })}
          </AppView>
        </AppScrollView>
      </AppView>
    </AppSafeAreaView>
  );
}
