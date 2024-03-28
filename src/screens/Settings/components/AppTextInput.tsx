import React, {  } from 'react';
import { AppText, AppView } from '@/components';
import { createBox } from '@shopify/restyle';
import { Theme, fonts, theme } from '@/themes';
import { TextInput as BaseTextInput } from 'react-native';
import { TextInputProps } from 'react-native';

export interface ITextInput extends TextInputProps {
    title: string,
}

const TextInput = createBox<Theme, TextInputProps>(BaseTextInput);

const AppTextInput = (props: ITextInput) => {

    return (
        <AppView gap='xs'>
            <AppText color={'color72'}  variant={'heading3'}>{props.title}</AppText>
            <TextInput
                backgroundColor={'bgBlack'}
                height={props?.multiline ?  96 : 48}
                defaultValue={props?.value}
                paddingHorizontal='base'
                style={{
                    color: theme.colors.color26,
                    fontSize: 16,
                    fontFamily: fonts.Regular
                }}
                justifyContent='center'
                borderRadius={'xxs'}
                borderWidth={1}
                borderColor={'colorF0'}
                textAlignVertical={'top'}
                paddingVertical={'xs'}
                placeholderTextColor={theme.colors.colorBF}
                {...props}
            />
        </AppView>

    );
};

export default AppTextInput;