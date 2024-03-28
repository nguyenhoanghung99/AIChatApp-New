import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { responsiveHeight } from '@/themes';
import { useTranslation } from 'react-i18next';
import { AppBackHeader, AppButtonV2, AppInput, AppScrollView, AppText } from '@/components';

type TForm = {
  description: string;
  attachments: []
}
export default function HelpSupport() {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<TForm>({
    defaultValues: {
      description: '',
      attachments: []
    }
  })
  const onSubmit = useCallback((value: TForm) => {

  }, [])
  return (
    <AppBackHeader title='Help & Support'>
      <AppScrollView paddingHorizontal='base'>
        <AppText color="neutralGrey7" paddingVertical='xs'>
          {t(
            'Tell us your problem. We will reply via mail within a week. Thank you for choosing us!',
          )}
        </AppText>
        <Controller
          name='description'
          control={control}
          render={({ field: { onBlur, onChange } }) => {
            return <>
              <AppText variant='heading3' color='neutralGrey7' paddingBottom='xxs'>{t('Describe your problem')}</AppText>
              <AppInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder='Tell us more...'
                multiline
                style={{
                  height: responsiveHeight(80),
                  paddingHorizontal: responsiveHeight(16),
                  marginTop: 10
                }}
              />
            </>
          }}
        />
        <Controller
          name='description'
          control={control}
          render={({ field: { onBlur, onChange } }) => {
            return <>
              <AppText variant='heading3' color='neutralGrey7' paddingBottom='xxs'>{t('Describe your problem')}</AppText>
              <AppInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder='Tell us more...'
                multiline
                style={{
                  height: responsiveHeight(80),
                  paddingHorizontal: responsiveHeight(16),
                  marginTop: 10
                }}
              />
            </>
          }}
        />
        <AppButtonV2
          label='Send'
          onPress={handleSubmit(onSubmit)}
        />
      </AppScrollView>
    </AppBackHeader>
  );
}
