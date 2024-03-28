import React, { memo } from 'react';
import { AppText, AppView } from '@/components';
import AppButton from '@/components/AppButton/AppButton';

interface IRadio {
    value: boolean,
    title: string,
    onPress: () => void
}

const Radio = memo((props: IRadio) => {
    console.log('value', props.value)
    return (
        <AppButton
            onPress={() => props?.onPress?.()}
            flexDirection='row'
            gap='base'
        >
            <AppView
                width={20}
                height={20}
                borderRadius={'lg'}
                borderColor={props?.value ? 'lightLink' : 'color72'}
                borderWidth={1}
                justifyContent='center'
                alignItems='center'
            >
                {props?.value && <AppView width={10} height={10} borderRadius={'lg'} backgroundColor={'lightLink'} />}
            </AppView>
            <AppText  variant={'rMedium'} color={'color26'}>{props.title}</AppText>
        </AppButton>
    );
});

export default Radio;