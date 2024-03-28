import { AppText, AppView } from '@/components'
import { TYPE_MESSAGE } from '@/constants';
import React from 'react'

type TProps = {
  message: string;
  subType: TYPE_MESSAGE.PIN | TYPE_MESSAGE.UNPIN
}
export default function MessagePinOrUnPin({ message, subType }: TProps) {
  return (
    <AppView flexDirection="row" justifyContent="center" marginBottom="tiny">
      <AppText variant="small" color='black'>{message}</AppText>
    </AppView>
  )
}
