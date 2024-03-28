import React, { PropsWithChildren, Ref, forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import Modal from 'react-native-modal';
import { AppPressable } from '@/components';
import { Theme } from '@/themes';
import { BlurView } from '@react-native-community/blur';

type TProps = {} & PropsWithChildren
const AppModalBlur = forwardRef(({ children }: TProps, ref: Ref<TModalRef>) => {
  const [isVisible, setIsVisible] = useState(false);
  const { colors } = useTheme<Theme>();

  useImperativeHandle(ref, () => ({ onClose, onShow }))

  const onClose = useCallback(() => {
    setIsVisible(false)
  }, []);
  const onShow = useCallback(() => {
    setIsVisible(true)
  }, []);
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriverForBackdrop
      backdropColor={'transparent'}
      style={[{ margin: 0 }]}
    >
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: colors.blur
        }}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor={colors.white}
      >
        <AppPressable
          onPress={onClose}
          style={{ width: '100%', height: '100%' }}
        />
      </BlurView>
      {children}
    </Modal>
  )
})
export default memo(AppModalBlur)