import React, {
  PropsWithChildren,
  RefObject,
  memo,
  useCallback,
} from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { AppIcon, AppView } from '@/components';
import { FontSizes, Icons } from '@/themes';
import { useReplyStore } from '@/stores';
import { TYPE_MESSAGE } from '@/constants';

type TProps = {
  isMyMessage: boolean;
  position?: string;
  swipeableRowRef: RefObject<Swipeable>;
  message: TMessage;
} & PropsWithChildren;
function AppSwipeableReply({
  isMyMessage,
  children,
  swipeableRowRef,
  message,
  ...props
}: TProps) {
  const { setReplySender } = useReplyStore(state => state);
  const renderRightAction = (
    progressAnimatedValue: Animated.AnimatedInterpolation<any>,
  ) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -12, -20],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: size }, { translateX: trans }] },
          isMyMessage ? styles.defaultBottomOffset : styles.bottomOffsetNext,
          props?.position === 'right' && styles.leftOffsetValue,
        ]}>
        <AppView style={styles.replyImageWrapper}>
          <AppIcon name={Icons.Reply} size={FontSizes.xlarge} />
        </AppView>
      </Animated.View>
    );
  };

  const onSwipeOpenAction = useCallback(() => {
    setReplySender({
      message,
      subType: TYPE_MESSAGE.REPLY
    })
    swipeableRowRef.current?.close();
  }, [message, setReplySender, swipeableRowRef]);
  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightAction}
      dragOffsetFromRightEdge={1}
      onSwipeableWillOpen={onSwipeOpenAction}
      overshootRight={false}>
      {children}
    </Swipeable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 40,
  },
  replyImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyImage: {
    width: 20,
    height: 20,
  },
  defaultBottomOffset: {
    marginBottom: 2,
  },
  bottomOffsetNext: {
    marginBottom: 10,
  },
  leftOffsetValue: {
    marginLeft: 16,
  },
});
export default memo(AppSwipeableReply);
