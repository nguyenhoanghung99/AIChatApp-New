import React, { memo, useCallback, useEffect } from 'react'
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { Easing, Animated, StyleSheet } from 'react-native';
import { useSharedValue, withTiming, ReduceMotion, useAnimatedStyle } from 'react-native-reanimated';
import { AppView, AppText, AppIcon, AppTouchableOpacity } from '@/components'
import { Icons, FontSizes, responsiveHeight, responsiveWidth, Theme } from '@/themes';
type TProps = {
  onReset?: () => void
  isShow: boolean
  userName: string
  message: string
}
function ThreadMessageForward({ isShow, onReset, message, userName }: TProps) {
  const { t } = useTranslation();
  const { colors } = useTheme<Theme>();
  const translateY = useSharedValue(200);
  useEffect(() => {
    if (isShow) {
      translateY.value = withTiming(0, {
        duration: 400,
        easing: Easing.cubic,
        reduceMotion: ReduceMotion.System,
      })
    }
  }, [isShow, translateY])

  const onCloseForwardMessage = useCallback(() => {
    translateY.value = withTiming(200, {
      duration: 400,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    })
    onReset?.();
  }, [onReset, translateY])
  const animationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 1,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  })
  console.log('isShow', isShow)
  return (
    <Animated.View
      style={[styles.container, { backgroundColor: colors.white }, animationStyles]}
    >
      <AppIcon name={Icons.Forward} size={FontSizes.title} color={colors.lightLink} />
      <AppView flex={1} flexDirection='row' alignItems='center' gap='xxs'>
        <AppView width={1} height={responsiveHeight(44)} backgroundColor='lightLink' />
        <AppView>
          <AppText variant='baseSemiBold' color='lightLink'>{t('Forward to')} {userName}</AppText>
          <AppText variant='span' color='neutralGrey6' marginTop='tiny' numberOfLines={1}>{message}</AppText>
        </AppView>
      </AppView>
      <AppTouchableOpacity onPress={onCloseForwardMessage}>
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
    paddingVertical: responsiveHeight(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(16),
  }
})
export default memo(ThreadMessageForward)