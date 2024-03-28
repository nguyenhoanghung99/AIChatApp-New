import React, { Ref, forwardRef } from 'react';
import {View as NativeView, ViewProps as NativeViewProps} from 'react-native';
import {createBox} from '@shopify/restyle';
import {Theme} from '@/themes';
const View = createBox<Theme, NativeViewProps>(NativeView);

type ViewProps = React.ComponentProps<typeof View> & {
  children?: React.ReactNode;
};

const AppView = ({children, ...props}: ViewProps, ref: Ref<NativeView>) => {
  return <View {...props} ref={ref}>{children}</View>;
};
export default forwardRef(AppView);
