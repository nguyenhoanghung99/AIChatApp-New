import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AppModalConfirm, AppPressable, AppText, AppView } from '@/components'

export default function BlockMessageUser() {
  const { t } = useTranslation();
  const modalRef = useRef<TModalRef>(null)
  return (
    <>
      <AppView paddingBottom='lg' paddingHorizontal='base' backgroundColor='white' zIndex={20}>
        <AppView alignItems='center' paddingVertical='base'>
          <AppText variant='spanSemibold' color='neutralGrey6'>You've blocked [User]</AppText>
          <AppText variant='span' color='colorBF' textAlign='center'>
            {t("You can't message them, and you won't receive any of their messages.")}
          </AppText>
        </AppView>
        <AppPressable
          paddingVertical='xxs'
          backgroundColor='lightLink'
          borderRadius='base'
          onPress={() => modalRef.current?.onShow()}
        >
          <AppText variant='baseSemiBold' color='white' textAlign='center'>{t('Unblock')}</AppText>
        </AppPressable>
      </AppView>
      <AppModalConfirm
        title='Unblock on Friendify?'
        subTitle='Are you sure you want to unblock [User] on Friendify?'
        ref={modalRef}
        labelCanncel='Cancel'
        labelOk='Unblock'
        onOk={() => {}}
      />
    </>
  )
}
