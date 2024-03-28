import React, { Ref, forwardRef } from 'react';
import {
  Pressable as NativePressable,
  PressableProps as NativePressableProps,
} from 'react-native';
import {createBox} from '@shopify/restyle';
import {Theme, hitSlop} from '@/themes';
const Pressable = createBox<Theme, NativePressableProps>(NativePressable);

type PressableProps = React.ComponentProps<typeof Pressable> & {
  children?: React.ReactNode;
};

const AppPressable = ({children, ...props}: PressableProps, ref: Ref<any>) => {
  return (
    <Pressable {...props} hitSlop={hitSlop} ref={ref}>
      {children}
    </Pressable>
  );
};
export default forwardRef(AppPressable);
