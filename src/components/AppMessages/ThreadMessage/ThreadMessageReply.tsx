import React, { memo, useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@shopify/restyle'
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { AppIcon, AppText, AppTouchableOpacity, AppView } from '@/components'
import { FontSizes, Icons, Theme, responsiveHeight, responsiveWidth } from '@/themes'
import { useReplyStore } from '@/stores'

function ThreadMessageReply() {
  const { replySender, resetReplySender } = useReplyStore(state => state)
  const { t } = useTranslation();
  const { colors } = useTheme<Theme>();
  const translateY = useSharedValue(200);
  useEffect(() => {
    const isReply = Boolean(replySender?.message?._id)
    translateY.value = withTiming(isReply ? 0 : 200, {
      duration: 100,
      easing: isReply ? Easing.cubic : Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    })
  }, [replySender?.message?._id, translateY])

  const animationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 100,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  })
  return (
    <Animated.View
      style={[styles.container, { backgroundColor: colors.white }, animationStyles]}
    >
      <AppIcon name={Icons.Reply} size={FontSizes.title} color={colors.lightLink} />
      <AppView flex={1} flexDirection='row' alignItems='center' gap='xxs'>
        <AppView width={1} height={responsiveHeight(44)} backgroundColor='lightLink' />
        <AppView>
          <AppText variant='baseSemiBold' color='lightLink'>{t('Reply to')} {replySender?.message?.sender?.fullName}</AppText>
          <AppText variant='span' color='neutralGrey6' marginTop='tiny' numberOfLines={1}>{replySender?.message?.content}</AppText>
        </AppView>
      </AppView>
      <AppTouchableOpacity onPress={resetReplySender}>
        <AppIcon name={Icons.Close} size={FontSizes.body} color={colors.lightLink} />
      </AppTouchableOpacity>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: responsiveWidth(16),
    paddingTop: responsiveHeight(12),
    ...Platform.select({
      android: {
        paddingBottom: responsiveHeight(8),
      }
    }),
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(16),
    zIndex: 20
  }
})
export default memo(ThreadMessageReply)