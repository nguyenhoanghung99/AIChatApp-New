import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { useTheme } from '@shopify/restyle'
import { AppText, AppTouchableOpacity } from '@/components'
import { Theme } from '@/themes'

type TProps = {
  onPress: () => void;
  label: string;
  isLoading?: boolean;
  backgroundColor?: any
  color?: any
}
export default function AppButtonV2({ onPress, label, isLoading, backgroundColor, color }: TProps) {
  const { colors } = useTheme<Theme>()
  const { t } = useTranslation();
  return (
    <AppTouchableOpacity
      backgroundColor={backgroundColor ?? 'lightLink'}
      paddingVertical='xxs'
      borderRadius='sm'
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      gap='xxs'
      onPress={onPress}
      disabled={isLoading}
    >
      <AppText variant='heading3' color={color ?? 'white'} textAlign='center'>{t(label)}</AppText>
      {isLoading && <ActivityIndicator color={color ?? colors.white} />}
    </AppTouchableOpacity>
  )
}
