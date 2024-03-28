import React from 'react';
import {Text as NativeText, TextProps as NativeTextProps} from 'react-native';
import {createText} from '@shopify/restyle';
import {Theme} from '@/themes';

const Text = createText<Theme, NativeTextProps>(NativeText);

type TextProps = React.ComponentProps<typeof Text> & {
  children: React.ReactNode;
};

const AppText = ({children, ...props}: TextProps) => {
  return <Text {...props}>{children}</Text>;
};
export default AppText;
