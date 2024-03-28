import React from 'react';
import { useTranslation } from 'react-i18next';

import { AppButtonV2, AppSafeAreaView, AppText, AppView } from '@/components';
import AppCheckbox from '@/components/AppCheckbox/AppCheckbox';
import ScreenHeader from '@/components/AppHeader/ScreenHeader';
import AppScrollView from '@/components/AppScrollView/AppScrollView';

import { FontSizes } from '@/themes';

import { goBack } from '@/navigator/NavigationService';

import { EMenuTitle } from '@/constants';
import { SurveyList } from '@/utilities';

const RequestReceived = () => {
  const { t } = useTranslation();
  return (
    <AppSafeAreaView>
      <ScreenHeader
        title={t(EMenuTitle.RequestReceived)}
      />
      <AppView justifyContent="space-between" padding="base">
        <AppView maxHeight={600}>
          <AppText
            marginBottom="base"
            color="color90"
            fontSize={FontSizes.span}>
            {t(
              "We're sending an email to ***email@gmail.com confirming when your account is deleted.",
            )}
          </AppText>
          <AppView>
            <AppText color="black" fontSize={FontSizes.title}>
              {t('Why did you decide to leave this app?')}
            </AppText>
            <AppText marginTop="lg" color="color90" fontSize={FontSizes.span}>
              {t('Give an optional feedback to help us improve!')}
            </AppText>
          </AppView>
          <AppScrollView>
            {SurveyList.map(survey => {
              return (
                <AppView
                  marginVertical="xxs"
                  flexDirection="row"
                  alignItems="center">
                  <AppCheckbox
                    label={t(survey.survey)}
                    value={survey.id}
                    onChange={() => { }}
                  />
                </AppView>
              );
            })}
          </AppScrollView>
        </AppView>

        <AppView gap="xs">
          <AppButtonV2
            label='Delete Account'
            onPress={() => {}}
            backgroundColor={'white'}
            color={'red'}
          />
          <AppButtonV2
            label='Go back'
            onPress={goBack}
            backgroundColor={'white'}
            color={'lightLink'}
          />
        </AppView>
      </AppView>
    </AppSafeAreaView>
  );
};

export default RequestReceived;
