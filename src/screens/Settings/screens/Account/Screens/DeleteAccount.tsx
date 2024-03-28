import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppBackHeader, AppButtonV2, AppModalConfirm, AppText, AppView } from '@/components';

import { goBack, navigationRef } from '@/navigator/NavigationService';
import { Routes } from '@/navigator/Routes';
import { FontSizes } from '@/themes';

const DeleteAccount = () => {
  const { t } = useTranslation();
  const modalRef = useRef<TModalRef>(null);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const handleDeleteAccount = () => {
    setIsShowModalConfirm(false);
    // @ts-ignore
    navigationRef.navigate(Routes.RequestReceieved);
  };

  return (
    <AppBackHeader title='Delete Account'>
      <AppView paddingHorizontal="base" gap="xxl" marginTop="xxl">
        <AppView gap="base">
          <AppText color="black" variant="heading5">
            {t('Are you sure you want to delete your account?')}
          </AppText>
          <AppText color="neutralGrey7" fontSize={FontSizes.body}>
            {t(
              'Once you delete your account, it cannot be undone. All your data will be permanently erased from this app includes your profile information, preferences, saved content, and any activity history.',
            )}
          </AppText>
          <AppText color="neutralGrey7" fontSize={FontSizes.body}>
            {t(
              "We're sad to see you go, but we understand that sometimes it's necessary. Please take a moment to consider the consequences before proceeding.",
            )}
          </AppText>
        </AppView>
        <AppView gap="xs">
          <AppButtonV2
            label='Delete Account'
            onPress={() => modalRef.current?.onShow()}
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
      <AppModalConfirm
        ref={modalRef}
        onOk={() => { }}
        labelCanncel='Cancel'
        labelOk='Confirm'
        title={'Are you sure you want to continue?'}
        subTitle={'This action cannot be undone. Are you sure you want to continue?'}
      />
    </AppBackHeader>
  );
};

export default DeleteAccount;
