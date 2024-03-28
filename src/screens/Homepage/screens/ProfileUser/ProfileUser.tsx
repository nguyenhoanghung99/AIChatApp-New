import { useTheme } from '@shopify/restyle';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppAvatar, AppIcon, AppSafeAreaView, AppScrollView, AppText, AppTouchableOpacity, AppView } from '@/components';
import { goBack } from '@/navigator';
import { FontSizes, Icons, Theme, isIOS } from '@/themes';

type TProps = {}
type TBlockProps = {
  title: string
  content: string
}
const BlockInfo = memo(({ title, content }: TBlockProps) => {
  const { t } = useTranslation();
  return (
    <AppView
      backgroundColor='neutralGrey5'
      paddingHorizontal='xs'
      paddingVertical='xxs'
      borderRadius='xxs'
      marginBottom='base'
    >
      <AppText variant='spanSemibold' color='neutralGrey7'>{t(title)}</AppText>
      <AppText color='neutralGrey9'>{content}</AppText>
    </AppView>
  )
})

export default function ProfileUser({ }: TProps) {
  const { colors } = useTheme<Theme>()
  return (
    <AppSafeAreaView backgroundColor="bgBlack" flex={1}>
      <AppTouchableOpacity onPress={goBack} paddingHorizontal='base'
        marginTop={isIOS ? 'reset' : 'xs'}
      >
        <AppIcon name={Icons.ChevronLeft} size={FontSizes.large} color={colors.neutralGrey9} />
      </AppTouchableOpacity>
      <AppScrollView paddingVertical='lg' paddingHorizontal='base'>
        <AppView alignItems='center' justifyContent='center'>
          <AppAvatar
            width={100}
            height={100}
            borderRadius={100 / 2}
          />
          <AppText variant='heading3' color='neutralGrey9'>Username</AppText>
        </AppView>
        <AppView marginVertical='xs'>

        </AppView>
        <BlockInfo title='Bio' content='Nulla dolor culpa aliqua consectetur id ' />
        <BlockInfo title={'Username'} content={'abczyx123098'} />
        <BlockInfo title={'Birthdate'} content={'01/01/2000'} />
        <BlockInfo title={'Gender'} content={'Female'} />
      </AppScrollView>
    </AppSafeAreaView>
  );
}
