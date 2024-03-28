import React from 'react';
import {
  SafeAreaView as NativeSafeAreaView,
  NativeSafeAreaViewProps,
} from 'react-native-safe-area-context';
import {createBox} from '@shopify/restyle';
import {Theme} from '@/themes';
const SafeAreaView = createBox<Theme, NativeSafeAreaViewProps>(
  NativeSafeAreaView,
);

type SafeAreaViewProps = React.ComponentProps<typeof SafeAreaView> & {
  children: React.ReactNode;
};

const AppSafeAreaView = ({children, ...props}: SafeAreaViewProps) => {
  return <SafeAreaView {...props}>{children}</SafeAreaView>;
};
export default AppSafeAreaView;
