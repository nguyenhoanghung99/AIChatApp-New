import React, {
  PropsWithChildren,
  Ref,
  RefObject,
  forwardRef,
  memo,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, I18nManager, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { AppIcon, AppText, AppView } from '@/components';
import { BaseStyles, FontSizes, Icons, Theme, responsiveWidth } from '@/themes';
import { useTheme } from '@shopify/restyle';
import { useMutationChannelActions } from '@/hooks';

type ActionProps = {
  label: string;
  onPress: () => void;
  progress: Animated.AnimatedInterpolation<number>;
  x: number;
  backgroundColor: string;
  icon: string
};
type TProps = {
  _swipeRef: RefObject<Swipeable>;
  isPin: boolean;
  isMute: boolean;
  roomId: string;
} & PropsWithChildren;

const ActionItem = memo(({ label, onPress, progress, x, backgroundColor, icon }: ActionProps) => {
  const { colors } = useTheme<Theme>();
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });
  return (
    <Animated.View
      style={[BaseStyles.flex1, { transform: [{ translateX: trans }] }]}>
      <RectButton
        onPress={onPress}
        style={[styles.rightAction, { backgroundColor }]}>
        {icon && <AppIcon name={icon} size={FontSizes.large} color={colors.white} style={{ marginBottom: 5 }} />}
        <AppText variant="span" color="white">
          {label}
        </AppText>
      </RectButton>
    </Animated.View>
  );
});
function AppSwipeable(
  { children, _swipeRef, isPin, isMute, roomId }: TProps,
  ref: Ref<{ onClose: () => void }>,
) {
  const { colors } = useTheme<Theme>();
  const swipeRef = useRef<Swipeable>(null);
  const uuId = useId();
  const { t } = useTranslation();
  const { onChannelActionMute, onChannelActionPin } = useMutationChannelActions();
  const onClose = useCallback(() => {
    if (_swipeRef && _swipeRef?.current !== null) {
      if (_swipeRef?.current === swipeRef.current) {
        _swipeRef.current?.close();
        _swipeRef.current = null;
      }
    }
  }, [_swipeRef]);
  useImperativeHandle(ref, () => ({ onClose }));

  const actions = useMemo(() => {
    return [
      {
        id: uuId,
        label: isPin ? t('Unpin') : t('Pin'),
        onPress: () => onChannelActionPin({ roomId }, () => onClose()),
        x: 0,
        backgroundColor: colors.indigo,
        icon: isPin ? Icons.Unpin : Icons.PinOutline
      },
      {
        id: uuId,
        label: isMute ? t('Unmute') : t('Mute'),
        onPress: () => onChannelActionMute({ roomId }, () => onClose()),
        x: 0,
        backgroundColor: colors.color72,
        icon: isMute ? Icons.Unmute : Icons.Noti
      },
      {
        id: uuId,
        label: t('Delete'),
        onPress: () => { },
        x: 0,
        backgroundColor: colors.red,
        icon: Icons.Unsend
      },
    ];
  }, [isMute, isPin, t, uuId, roomId, onChannelActionMute, onChannelActionPin, onClose]);


  const renderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation<number>,
      _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
    ) => {
      return (
        <AppView
          width={responsiveWidth(200)}
          flexDirection={I18nManager.isRTL ? 'row-reverse' : 'row'}>
          {actions?.map((item, index) => {
            return <ActionItem key={index} {...item} progress={progress} />;
          })}
        </AppView>
      );
    },
    [actions],
  );

  const handleSwipeableWillOpen = useCallback(() => {
    if (_swipeRef && _swipeRef?.current !== null) {
      if (_swipeRef?.current !== swipeRef.current) {
        _swipeRef.current?.close();
        _swipeRef.current = null;
      }
    }
  }, [_swipeRef]);

  const handleSwipeableOpen = () => {
    _swipeRef.current = swipeRef.current;
  };

  return (
    <Swipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      ref={swipeRef}
      renderRightActions={renderRightActions}
      dragOffsetFromRightEdge={1}
      onSwipeableOpen={handleSwipeableOpen}
      onSwipeableWillOpen={handleSwipeableWillOpen}>
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
export default forwardRef(AppSwipeable);
