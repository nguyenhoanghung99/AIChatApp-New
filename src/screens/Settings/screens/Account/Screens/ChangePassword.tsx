import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppBackHeader, AppButtonV2, AppInput, AppText, AppView } from '@/components';
import { FontSizes } from '@/themes';
import { useMutationAuthen } from '@/hooks';
import { validateFromChangePassword } from '@/utilities';

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      oldPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validateFromChangePassword),
  });
  const { onChangePasswordUser, isPending, isSuccess } = useMutationAuthen();

  const { t } = useTranslation();

  const onSubmit = (data: TChangePassword) => {
    onChangePasswordUser({
      password: data.password,
      oldPassword: data.oldPassword
    });
  };

  return (
    <AppBackHeader title='Change Password'>
      <AppView paddingHorizontal="base" gap="md" marginTop="md">
        <AppText textAlign="center" fontSize={FontSizes.body} color='neutralGrey7'>
          {t('Please enter your existing password and your new password')}
        </AppText>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              isPassword
              label={t('Current Password')}
              placeholder={t('Enter current password')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors?.oldPassword?.message}
            />
          )}
          name="oldPassword"
        />
        <AppView gap="tiny">
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                isPassword
                label={t('New Password')}
                placeholder={t('Enter new password')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.password?.message}
              />
            )}
            name="password"
          />
          <Controller
            control={control}
            rules={{}}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                isPassword
                placeholder={t('Confirm new password')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.confirmPassword?.message}
              />
            )}
            name="confirmPassword"
          />
        </AppView>
        <AppButtonV2
          label={t('Update')}
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending && !isSuccess}
        />
      </AppView>
    </AppBackHeader>
  );
};

export default ChangePassword;
