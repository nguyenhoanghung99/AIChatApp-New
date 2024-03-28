import React from 'react';
import BottomSheet, { BottomSheetProps as NativeBottomSheetProps } from '@gorhom/bottom-sheet';
import { createBox } from '@shopify/restyle';
import { Theme } from '@/themes';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
const BottomSheetComponent = createBox<Theme, NativeBottomSheetProps>(BottomSheet);

type BottomSheetComponentProps = React.ComponentProps<typeof BottomSheetComponent> & {
    bottomSheetRef: React.RefObject<BottomSheetMethods>
    children: React.ReactNode;
};

const AppBottomSheet = ({ bottomSheetRef, children, ...props }: BottomSheetComponentProps) => {
    return <BottomSheetComponent ref={bottomSheetRef} {...props}>{children}</BottomSheetComponent>;
};
export default AppBottomSheet;
