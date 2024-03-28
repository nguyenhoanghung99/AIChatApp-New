import React, { Ref, forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react'
import Modal from 'react-native-modal';
import { AppText, AppTouchableOpacity, AppView } from '@/components';
import { width } from '@/themes';

type TProps = {
  onOk: () => void
  onCannel?: () => void
  labelOk: string;
  labelCanncel: string
  title: string;
  subTitle: string
}
const AppModalConfirm = forwardRef(({ onOk, onCannel, labelCanncel, labelOk, title, subTitle }: TProps, ref: Ref<TModalRef>) => {
  const [isVisible, setIsVisible] = useState(false);

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
      style={[{ margin: 0, justifyContent: 'center', alignItems: 'center' }]}
    >
      <AppView
        borderRadius='sm'
        backgroundColor='white'
        padding='lg'
        width={width * 0.85}
        alignItems='center'
        justifyContent='center'
      >
        <AppText variant='heading2' textAlign='center'>{title}</AppText>
        <AppText textAlign='center' marginVertical='base'>{subTitle}</AppText>
        <AppView flexDirection='row'>
          <AppTouchableOpacity flex={1}
            borderWidth={1}
            borderRadius='sm'
            paddingVertical='xxs'
            marginRight='tiny'
            borderColor='lightLink'
            onPress={() => {
              onClose();
              onCannel?.();
            }}
          >
            <AppText textAlign='center' variant='heading3' color='lightLink'>{labelCanncel}</AppText>
          </AppTouchableOpacity>
          <AppTouchableOpacity flex={1}
             borderRadius='sm'
            paddingVertical='xxs'
            marginLeft='tiny'
            backgroundColor='lightLink'
            onPress={onOk}
          >
            <AppText textAlign='center' variant='heading3' color='white'>{labelOk}</AppText>
          </AppTouchableOpacity>
        </AppView>
      </AppView>
    </Modal>
  )
})
export default memo(AppModalConfirm)