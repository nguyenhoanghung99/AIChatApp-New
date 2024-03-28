import React from 'react';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';

import {
  AppButtonV2,
  AppInput,
  AppSafeAreaView,
  AppText,
  AppView,
} from '@/components';
import ScreenHeader from '@/components/AppHeader/ScreenHeader';


import { EMenuTitle } from '@/constants';

const ChangeEmail = () => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
    },
  });
  const {t} = useTranslation();

  const onSubmit = (data: any) => console.log(data);
  return (
    <AppSafeAreaView>
      <ScreenHeader
        title={EMenuTitle.HeaderEmail}
      />
      <AppView paddingHorizontal="xxl" gap="md" marginTop="md">
        <AppText textAlign="center" color="neutralGrey7">
          {t(
            'Your current email address is example@gmail.com What would you like to change it to?',
          )}
        </AppText>
        <Controller
          control={control}
          rules={{}}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              label={t('Email')}
              placeholder={t('Email')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        <AppButtonV2 
          label='Change'
          onPress={() => {}}
        />
      </AppView>
    </AppSafeAreaView>
  );
};

export default ChangeEmail;
