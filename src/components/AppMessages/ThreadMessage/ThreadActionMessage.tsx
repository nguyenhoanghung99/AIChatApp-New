import React, { Fragment, PropsWithChildren, Ref, forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle } from 'react-native';
import CryingFace from '@/assets/svg/CryingFace';
import FaceWithOpenMouth from '@/assets/svg/FaceWithOpenMouth';
import PoutingFace from '@/assets/svg/PoutingFace';
import RedHeart from '@/assets/svg/RedHeart';
import ThumbsUp from '@/assets/svg/ThumbsUp';
import { AppIcon, AppModalBlur, AppPressable, AppText, AppView } from '@/components';
import { FontSizes, Icons, responsiveWidth, width } from '@/themes';
import { useMutationMessageActions } from '@/hooks';
import { useReplyStore } from '@/stores';
import { TYPE_MESSAGE } from '@/constants';

type TProps = {
  position: {
    top: number;
  },
  modalStyle?: StyleProp<ViewStyle>
  isMyMessage: boolean;
  roomId: string
  messageId: string
  userIdPin: string
  idMessage: string
  isPinMessage?: boolean
  message: TMessage
} & PropsWithChildren
function ThreadActionMessage({
  children,
  position,
  modalStyle,
  isMyMessage,
  roomId,
  messageId,
  userIdPin,
  idMessage,
  isPinMessage,
  message
}: TProps,
  ref: Ref<TModalRef>) {
  const { onMessageActionMute, onMessageActionPin, onMessageActionReport, onMessageActionUnMute, onMessageActionUnsend } = useMutationMessageActions();
  const modalRef = useRef<TModalRef>(null)
  const { setReplySender } = useReplyStore();
  const { t } = useTranslation();
  useImperativeHandle(ref, () => ({
    onClose,
    onShow
  }))
  const onClose = useCallback(() => {
    modalRef.current?.onClose();
  }, []);
  const onShow = useCallback(() => {
    modalRef.current?.onShow();
  }, []);
  const actions = useMemo(() => {
    return [
      {
        label: t('Reply'),
        icon: Icons.Reply,
        onPress: () => {
          setReplySender({
            message,
            subType: TYPE_MESSAGE.REPLY
          })
          onClose();
        }
      },
      {
        label: t('Copy'),
        icon: Icons.Copy,
        onPress: () => { }
      },
      {
        label: t('Select Text'),
        icon: Icons.Text,
        onPress: () => { }
      },
      {
        label: t('Forward'),
        icon: Icons.Forward,
        onPress: () => { }
      },
      {
        label: t('Translate'),
        icon: Icons.Translate,
        onPress: () => { }
      },
      {
        label: isPinMessage ? t('Unpin') : t('Pin'),
        icon: isPinMessage ? Icons.Unpin : Icons.PinOutline,
        onPress: () => onMessageActionPin({ roomId, messageId, userIdPin, idMessage }, isPinMessage!, () => onClose())
      },
      ...(isMyMessage ? [{
        label: t('Unsend'),
        icon: Icons.Unsend,
        onPress: () => onMessageActionUnsend({ idMessage }, () => onClose())
      }] :
        []),
      {
        label: t('Report'),
        icon: Icons.Spam,
        onPress: () => { }
      },
    ]
  }, [roomId, messageId, userIdPin, idMessage, isPinMessage, onMessageActionPin, onClose, setReplySender])
  const emojis = useMemo(() => {
    return [
      {
        icon: <RedHeart />,
        key: ''
      },
      {
        icon: <FaceWithOpenMouth />,
        key: ''
      },
      {
        icon: <CryingFace />,
        key: ''
      },
      {
        icon: <PoutingFace />,
        key: ''
      },
      {
        icon: <ThumbsUp />,
        key: ''
      },
    ]
  }, [])
  return (
    <Fragment>
      <AppModalBlur ref={modalRef}>
        <AppView
          position="absolute"
          top={position?.top}
          style={[modalStyle, isMyMessage ? { right: responsiveWidth(15) } : {
            left: responsiveWidth(50)
          }]}
        >
          <AppView
            backgroundColor='white'
            padding="xxs"
            borderRadius="base"
            marginBottom='xxs'
            flexDirection='row'
            alignItems='center'
            gap='xxs'
          >
            {
              emojis.map((item, index) => {
                return <AppView key={index}>{item.icon}</AppView>
              })
            }
          </AppView>
          <AppView
            flexDirection='row'
            alignItems='center'
            marginBottom='xxs'
          >

            {children}
          </AppView>
          <AppView
            backgroundColor='white'
            paddingVertical="xxs"
            borderRadius="base"
            width={width * 0.75}
          >
            {
              actions.map((action, index) => {
                return (
                  <AppPressable key={index} onPress={action?.onPress}
                    flexDirection='row'
                    alignItems='center'
                    justifyContent="space-between"
                    paddingHorizontal="base"
                    paddingVertical="xxs"
                    borderBottomColor="borderBottom"
                    borderBottomWidth={index !== actions.length - 1 ? 1 : 0}
                  >
                    <AppText>{action?.label}</AppText>
                    <AppIcon name={action?.icon} size={FontSizes.large} />
                  </AppPressable>
                )
              })
            }
          </AppView>
        </AppView>
      </AppModalBlur>
    </Fragment>
  )
}
export default forwardRef(ThreadActionMessage)