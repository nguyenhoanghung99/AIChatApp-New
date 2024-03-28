import React, { memo } from 'react';
import { AppText, AppView } from '@/components';
import AppButton from '@/components/AppButton/AppButton';

interface IRadio {
  value: boolean,
  title: string,
  activeColor?: string,
  onPress: () => void
}

const AppRadio = memo((props: IRadio) => {
  const color =  props.activeColor ?? 'lightLink' as any;
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
        borderColor={props?.value ? color : 'color72'}
        borderWidth={1}
        justifyContent='center'
        alignItems='center'
      >
        {props?.value && <AppView width={10} height={10} borderRadius={'lg'} backgroundColor={color} />}
      </AppView>
      {props.title && <AppText variant={'rMedium'} color={'color26'}>{props.title}</AppText>}
    </AppButton>
  );
});

export default AppRadio;