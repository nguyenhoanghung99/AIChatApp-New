import { BaseStyles } from '@/themes';
import BottomSheet, { BottomSheetBackdrop, BottomSheetProps, useBottomSheetModalInternal, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { BackdropPressBehavior, BottomSheetBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { Ref, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { BackHandler, Keyboard } from 'react-native';
import { Portal } from '@gorhom/portal';

interface IBottomProps extends BottomSheetProps {
  children: React.ReactNode;
  pressBehavior?: BackdropPressBehavior;
  snapPoint?: Array<string>;
}
function AppBottomSheetCommon({ snapPoint, pressBehavior, children, ...props }: IBottomProps, ref: Ref<BottomSheetRef>,) {
  const refBottom = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => snapPoint ?? ['37%'], [snapPoint]);
  useImperativeHandle(ref, () => {
    return {
      onCloseBotSheet: () => refBottom.current?.close(),
      onOpenBotSheet: () => refBottom.current?.snapToIndex(0),
    };
  });
  useEffect(() => {
    const backAction = () => {
      refBottom.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const { containerHeight, containerOffset } = useBottomSheetModalInternal();
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const renderBackdrop = useCallback(
    ({ ...rest }: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...rest}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={Keyboard.dismiss}
        pressBehavior={pressBehavior ?? 'none'}
      />
    ),
    [pressBehavior],
  );

  return (
    <Portal>
      <BottomSheet
        ref={refBottom}
        snapPoints={snapPoints}
        index={-1}
        animateOnMount
        animationConfigs={animationConfigs}
        containerHeight={containerHeight}
        containerOffset={containerOffset}
        handleIndicatorStyle={BaseStyles.hideIndicator}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        android_keyboardInputMode='adjustResize'
        {...props}>
        {children}
      </BottomSheet>
    </Portal>
  )
}
export default forwardRef(AppBottomSheetCommon)