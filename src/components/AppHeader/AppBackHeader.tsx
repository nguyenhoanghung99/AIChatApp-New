import { AppIcon, AppSafeAreaView, AppText, AppTouchableOpacity, AppView } from '@/components';
import { goBack } from '@/navigator';
import { FontSizes, Icons, Theme, isIOS } from '@/themes';
import { useTheme } from '@shopify/restyle';
import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

type TProps = PropsWithChildren & {
  title: string
  icon?: string
}
export default function AppBackHeader({ children, title, icon }: TProps) {
  const { colors } = useTheme<Theme>()
  const { t } = useTranslation();
  return <AppSafeAreaView
    flex={1}
    backgroundColor='white'
    paddingTop={isIOS ? 'reset' : 'xs'}
    edges={['top']}
    paddingBottom='reset'
  >
    <AppView
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      paddingHorizontal='base'
      paddingBottom='xs'
    >
      <AppTouchableOpacity onPress={goBack}>
        <AppIcon name={icon ?? Icons.ArrowLeft} size={FontSizes.body} color={colors.neutralGrey9} />
      </AppTouchableOpacity>
      <AppView>
        <AppText variant='heading2'>{t(title)}</AppText>
      </AppView>
      <AppView opacity={0}>
        <AppText>pp</AppText>
      </AppView>
    </AppView>
    <AppView flexGrow={1} backgroundColor='neutralGrey3'>
      {children}
    </AppView>
  </AppSafeAreaView>
}
