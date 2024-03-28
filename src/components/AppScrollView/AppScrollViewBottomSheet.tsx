import React from 'react';
import { ScrollView as NativeScrollView, ScrollViewProps as NativeScrollViewProps } from 'react-native';
import { BottomSheetScrollView as NativeBottomSheetScrollView, BottomSheetScrollableProps as NativeBottomSheetScrollViewProps } from "@gorhom/bottom-sheet";
import { createBox } from '@shopify/restyle';
import { Theme } from '@/themes';
const BottomSheetScrollView = createBox<Theme, NativeBottomSheetScrollViewProps>(NativeBottomSheetScrollView);

type BottomSheetScrollViewProps = React.ComponentProps<typeof BottomSheetScrollView> & {
    children: React.ReactNode;
};

const AppBottomSheetScrollView = ({ children, ...props }: BottomSheetScrollViewProps) => {
    return <BottomSheetScrollView {...props}>{children}</BottomSheetScrollView>;
};
export default AppBottomSheetScrollView;
