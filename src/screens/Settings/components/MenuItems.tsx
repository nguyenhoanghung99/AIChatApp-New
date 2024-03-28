import { AppIcon, AppText, AppView } from '@/components';
import React from 'react';
import AppButton from '@/components/AppButton/AppButton';
import { Icons, Theme, fonts } from '@/themes';
import { navigate } from '@/navigator';
import { useTheme } from '@shopify/restyle';

type MenuItems = {
    title?: string,
    subTitle?: string,
    icon?: string,
    isBreak?: boolean,
    isFist?: boolean,
    color: string,
    screen?: string
};
interface Props {
    item: MenuItems
}
const MenuItems = (props: Props) => {
    const {colors} = useTheme<Theme>();
    const _onPress = () => {
        navigate(props?.item?.screen ?? '');
    }
    return (
        <AppButton
            onPress={_onPress}
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            backgroundColor={'bgBlack'}
            gap='base'
            marginHorizontal='base'
            marginBottom={props.item?.isBreak ? 'lg' : 'reset'}
            borderTopLeftRadius={props.item?.isFist ? 'xxs' : 'reset'}
            borderBottomLeftRadius={props.item?.isBreak ? 'xxs' : 'reset'}
            borderTopRightRadius={props.item?.isFist ? 'xxs' : 'reset'}
            borderBottomRightRadius={props.item?.isBreak ? 'xxs' : 'reset'}
        >
            <AppView marginLeft='base' bg={props.item.color as any} width={32} height={32} borderRadius={'sm'} alignItems='center' justifyContent='center'>
                <AppIcon name={props.item?.icon ?? ''} color={'white'} size={20} />
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
                <AppText color={'color26'} variant={'headingR3'}>{props?.item?.title}</AppText>
                <AppView
                    flexDirection="row"
                    gap='base'
                    alignItems='center'
                    paddingRight='base'
                    justifyContent={'space-between'}
                >
                    <AppText color={'color72'}  variant={'rMedium'} >{props?.item?.subTitle}</AppText>
                    <AppView flexDirection="row" gap='base' alignItems='center'>
                        <AppIcon name={Icons.ChevronRight} color={colors.neutralGrey9}/>
                    </AppView>
                </AppView>
            </AppView>
        </AppButton>
    );
};
export default MenuItems;