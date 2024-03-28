import React from 'react';
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
} from 'react-native';
import {createBox} from '@shopify/restyle';
import {Theme} from '@/themes';
const TextInput = createBox<Theme, NativeTextInputProps>(NativeTextInput);

export type TextInputProps = React.ComponentProps<typeof TextInput>;

const AppTextInput = ({...props}: TextInputProps) => {
  return <TextInput {...props} />;
};
export default AppTextInput;
