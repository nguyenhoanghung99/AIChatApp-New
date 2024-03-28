import React from 'react';
import {
  ScrollView as NativeScrollView,
  ScrollViewProps as NativeScrollViewProps,
} from 'react-native';
import {createBox} from '@shopify/restyle';
import {Theme} from '@/themes';
const ScrollView = createBox<Theme, NativeScrollViewProps>(NativeScrollView);

type ScrollViewProps = React.ComponentProps<typeof ScrollView> & {
  children: React.ReactNode;
};

const AppScrollView = ({children, ...props}: ScrollViewProps) => {
  return <ScrollView {...props}>{children}</ScrollView>;
};
export default AppScrollView;
