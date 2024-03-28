import React from 'react'
import { useTranslation } from 'react-i18next'
import { Messenger } from '@/assets/svg';
import { AppText, AppView } from '@/components'

export default function MessageNoFriendEmpty() {
  const {t} = useTranslation();
  return (
    <AppView flex={1} alignItems='center' justifyContent='center'>
      <Messenger />
      <AppView alignItems='center' paddingTop='lg'>
        <AppText variant='heading3' color='neutralGrey6'>{t('Hello')}</AppText>
        <AppText textAlign='center' color='neutralGrey6'>{t(`This person is not your friend. \nPlease considerate when \ntalking.`)}</AppText>
      </AppView>
    </AppView>
  )
}
