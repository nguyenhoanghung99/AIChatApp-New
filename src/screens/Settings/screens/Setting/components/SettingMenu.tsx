import { useTheme } from '@shopify/restyle';
import React from 'react'
import { AppIcon, AppText, AppTouchableOpacity, AppView } from '@/components';
import { navigate } from '@/navigator';
import { Icons, Theme } from '@/themes';
type MenuItems = {
  title?: string,
  subTitle?: string,
  icon?: string,
  isBreak?: boolean,
  isFist?: boolean,
  color: string,
  screen?: string
};
type TProps = {
  item: MenuItems
}
function SettingMenu({ item }: TProps) {
  const { colors } = useTheme<Theme>();
  return (
    <AppTouchableOpacity
      onPress={() => item?.screen && navigate(item?.screen)}
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      backgroundColor={'bgBlack'}
      gap='base'
      marginHorizontal='base'
      marginBottom={item?.isBreak ? 'lg' : 'reset'}
      borderTopLeftRadius={item?.isFist ? 'xxs' : 'reset'}
      borderBottomLeftRadius={item?.isBreak ? 'xxs' : 'reset'}
      borderTopRightRadius={item?.isFist ? 'xxs' : 'reset'}
      borderBottomRightRadius={item?.isBreak ? 'xxs' : 'reset'}
    >
      <AppView marginLeft='base' bg={item.color as any} width={32} height={32} borderRadius={'sm'} alignItems='center' justifyContent='center'>
        <AppIcon name={item?.icon ?? ''} color={'white'} size={20} />
      </AppView>
      <AppView
        flexDirection="row"
        alignItems='center'
        flex={1}
        borderBottomWidth={1}
        paddingVertical='base'
        justifyContent={'space-between'}
        borderBottomColor='border'
      >
        <AppText color={'color26'} variant={'headingR3'}>{item?.title}</AppText>
        <AppView
          flexDirection="row"
          gap='xxs'
          alignItems='center'
          paddingRight='base'
          justifyContent={'space-between'}
        >
          <AppText color='neutralGrey7'>{item?.subTitle}</AppText>
          <AppView flexDirection="row" gap='base' alignItems='center'>
            <AppIcon name={Icons.ChevronRight} color={colors.neutralGrey6} />
          </AppView>
        </AppView>
      </AppView>
    </AppTouchableOpacity>
  )
}
export default SettingMenu