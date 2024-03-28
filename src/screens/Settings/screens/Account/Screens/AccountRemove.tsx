import React from 'react';
import { useTranslation } from 'react-i18next';

import { AppButtonV2, AppIcon, AppSafeAreaView, AppText, AppView } from '@/components';
import ScreenHeader from '@/components/AppHeader/ScreenHeader';

import { navigationRef } from '@/navigator/NavigationService';
import { Icons } from '@/themes';

import { EMenuTitle } from '@/constants';

const AccountRemove = () => {
  const {t} = useTranslation();
  return (
    <AppSafeAreaView>
      <ScreenHeader
        onPressLeft={() => navigationRef.goBack()}
        leftOpt={<AppIcon name={Icons.ChevronLeft} size={10} color={'black'} />}
        title={t(EMenuTitle.AccountRemove)}
      />
      <AppView padding="base" gap="xxl">
        <AppView gap="xxs">
          <AppText variant="heading5" color="black">
            {t('Thank you for using our app!')}
          </AppText>
          <AppText color="neutralGrey7">
            {t(
              "We're sorry to see you go, but we respect your decision to delete your account. Your account deletion request has been successfully processed, and your account is now permanently deactivated.",
            )}
          </AppText>
          <AppText color="neutralGrey7">
            {t(
              "If you ever decide to return, we'll be here with new updates and features to make your experience even better.",
            )}
          </AppText>
        </AppView>

        <AppButtonV2 label={'Done'} onPress={() => {}}/>
      </AppView>
    </AppSafeAreaView>
  );
};

export default AccountRemove;
