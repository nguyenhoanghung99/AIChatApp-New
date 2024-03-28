import React from 'react'
import { useTranslation } from 'react-i18next';
import { AppText, AppView } from '@/components'
import { Messenger } from '@/assets/svg'

export default function MessageEmpty() {
  const { t } = useTranslation();
  return (
    <AppView flex={1} alignItems='center' justifyContent='center'>
      <Messenger />
      <AppView alignItems='center' paddingTop='lg'>
        <AppText variant='heading3' color='neutralGrey6'>{t('Hello')}</AppText>
        <AppText textAlign='center' color='neutralGrey6'>{t(`No messages here yet... Be \nthe first to break the silence!`)}</AppText>
      </AppView>
    </AppView>
  )
}
