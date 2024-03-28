import { AppIcon, AppTouchableOpacity, AppView } from '@/components'
import { FontSizes, Icons, responsiveHeight, responsiveWidth } from '@/themes'
import React from 'react'
import { StyleSheet } from 'react-native'

type TProps = {
  onPress: () => void
}
export default function ScrollToBottom({onPress}: TProps) {
  return (
    <AppView
      position="absolute"
      bottom={12}
      left={0}
      right={0}
      alignItems="center">
      <AppTouchableOpacity
        width={responsiveWidth(32)}
        height={responsiveHeight(32)}
        style={{ borderRadius: responsiveHeight(32 / 2) }}
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        backgroundColor="white"
        onPress={onPress}>
        <AppIcon
          name={Icons.ChevronLeft}
          size={FontSizes.body}
          style={styles.icon}
        />
      </AppTouchableOpacity>
    </AppView>
  )
}

const styles = StyleSheet.create({
  icon: {
    transform: [
      {
        rotate: '-90deg',
      },
    ],
  },
})