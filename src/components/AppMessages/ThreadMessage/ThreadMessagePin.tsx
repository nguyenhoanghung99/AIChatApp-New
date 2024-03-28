import React, { Fragment, memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { AppAvatar, AppIcon, AppModalBlur, AppText, AppTouchableOpacity, AppView } from '@/components';
import { FontSizes, Icons, Theme } from '@/themes';

type TProps = {
  listPins: TMessagePin[]
  isDetailLoading: boolean;
}
function ThreadMessagePin({ listPins, isDetailLoading }: TProps) {
  const modalRef = useRef<TModalRef>(null);
  const [positionTop, setPositionTop] = useState(0)
  const viewRef = useRef<View>(null)
  const { colors } = useTheme<Theme>();
  const { t } = useTranslation();

  const onCollapsePin = useCallback(() => {
    viewRef.current?.measure((x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number,) => {
      setPositionTop(pageY)
    })
    modalRef.current?.onShow();
  }, [])
  if (isDetailLoading || listPins?.length === 0) return;
  return (
    <>
      <AppView
        position="absolute"
        left={0}
        right={0}
        paddingHorizontal='base'
        paddingVertical='xxs'
        backgroundColor='white'
        zIndex={10}
        gap="sm"
        flexDirection='row'
        alignItems='center'
        ref={viewRef}
      >
        <AppIcon name={Icons.Pin} size={FontSizes.large} color={colors.lightLink} />
        <AppView flex={1}>
          <AppText variant="baseSemiBold" color="lightLink">{t('Pinned Message')}</AppText>
          <AppText variant="span" color="neutralGrey8" numberOfLines={1}>{listPins?.[0].content}</AppText>
        </AppView>
        <AppTouchableOpacity
          style={listPins?.length > 1 ? styles.dropdown : styles.circle}
          gap='xxs'
          onPress={onCollapsePin}
          backgroundColor="neutralGrey3"
        >
          {listPins?.length > 1 && <AppText variant="span">+{listPins?.length - 1}</AppText>}
          <AppIcon name={Icons.ChevronLeft} size={FontSizes.small} style={styles.icon} />
        </AppTouchableOpacity>
      </AppView>
      <AppModalBlur ref={modalRef}>
        <AppView
          position='absolute'
          top={positionTop}
          backgroundColor='white'
          left={0}
          right={0}
          paddingHorizontal='base'
          paddingVertical='xxs'
        >
          <AppText variant="baseSemiBold" color="lightLink">{t('Pin List')}</AppText>
          <AppView>
            {
              listPins?.map((item, index) => {
                return (
                  <Fragment key={item?.messageId}>
                    <AppView flexDirection='row' alignItems='center' gap='xxs' padding='xxs'>
                      <AppAvatar avatar={item?.avatarMessagesPin} />
                      <AppView flex={1}>
                        <AppText variant='baseSemiBold'>{item?.name}</AppText>
                        <AppText variant='span' color='neutralGrey8' numberOfLines={1}>{item?.content}</AppText>
                      </AppView>
                    </AppView>
                    {index !== listPins?.length - 1 && <AppView height={1} width={"100%"} backgroundColor="borderBottom" />}
                  </Fragment>
                )
              })
            }
          </AppView>
          <AppView flexDirection='row' alignItems='center' justifyContent='space-between' paddingVertical='xs'>
            <AppView flexDirection='row' alignItems='center' gap='xs'>
              <AppIcon name={Icons.Edit} size={FontSizes.body} color={colors.lightLink}/>
              <AppText color='lightLink'>{t('Edit')}</AppText>
            </AppView>
            <AppTouchableOpacity flexDirection='row' alignItems='center' gap='xs'
              onPress={() => modalRef.current?.onClose()}
            >
              <AppText>{t('Collapse')}</AppText>
              <AppIcon name={Icons.ChevronLeft} size={FontSizes.body} style={styles.collapse} />
            </AppTouchableOpacity>
          </AppView>
        </AppView>
      </AppModalBlur>
    </>
  )
}
const styles = StyleSheet.create({
  icon: {
    transform: [
      {
        rotate: '-90deg'
      }
    ]
  },
  collapse: {
    transform: [
      {
        rotate: '90deg'
      }
    ]
  },
  circle: {
    width: 28,
    height: 28,
    backgroundColor: '#F0F0F0',
    borderRadius: 28 / 2
  },
  dropdown: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row'
  }
})
export default memo(ThreadMessagePin)