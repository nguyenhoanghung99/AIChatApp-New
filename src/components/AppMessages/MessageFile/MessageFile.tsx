import React, { Dispatch, SetStateAction, memo, useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  AppAvatar,
  AppFastImage,
  AppPressable,
  AppText,
  AppView,
} from '@/components';
import AppSwipeableReply from '@/components/AppSwipeable/AppSwipeableReply';
import { responsiveHeight, responsiveWidth, width } from '@/themes';
import { DOCUMENT_ENUM } from '@/hooks';
import DocIcon from '@/assets/svg/chat/DocIcon';

type TProps = {
} & TMessageProps;
function MessageFile({
  content,
  justify,
  avatar,
  isMyMessage,
  message,
  idMessage,
}: TProps) {
  const swipeableRowRef = useRef<Swipeable | null>(null);
  const sources = JSON.parse(content);
  const _getIcon = useCallback((file: any) => {
    const _url = typeof file === 'string' ? file : file?.uri || file?.url;
    const extention = _url?.split('.');
    switch (extention.pop()) {
      case DOCUMENT_ENUM.DOC:
      case DOCUMENT_ENUM.DOCX:
      case DOCUMENT_ENUM.TXT:
        return <DocIcon />
      default:
        return <DocIcon />
    }
  }, [idMessage]);

  const _getNameFile = useCallback((file: any) => {
    const _url = typeof file === 'string' ? file : file?.uri || file?.url;
    return _url?.split('/').pop() ?? '';
  }, [idMessage]);

  return (
    <AppSwipeableReply
      key={`file${idMessage}`}
      isMyMessage={isMyMessage}
      swipeableRowRef={swipeableRowRef}
      message={message}>
      <Animated.View style={[{ justifyContent: justify }, styles.container]}>
        {!isMyMessage && (
          <AppAvatar
            avatar={avatar}
            width={responsiveWidth(28)}
            height={responsiveHeight(28)}
            borderRadius={responsiveHeight(28 / 2)}
          />
        )}

        <AppPressable
          backgroundColor="white"
          maxWidth={width * 0.75}
          paddingHorizontal="xs"
          paddingVertical="xxs"
          borderRadius="base">
          {
            sources?.data?.map((item: any, i: any) => {
              return (
                <AppView
                  key={`body-media${i}${idMessage}`}
                  flexDirection='row'
                  gap={'xxs'}
                >
                  {_getIcon(item)}
                  <AppText color='neutralGrey9'>{_getNameFile(item)}</AppText>
                </AppView>
              )
            })}
          {sources?.caption && <AppText color='neutralGrey9'>{sources?.caption ?? ''}</AppText>}
        </AppPressable>
      </Animated.View>
    </AppSwipeableReply>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: responsiveWidth(8),
    paddingHorizontal: responsiveWidth(16),
    marginBottom: responsiveWidth(6),
  },
  msgImage: {
    height: 250,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  evenImage: {
    height: 150,
    aspectRatio: 1,
    marginLeft: 3,
    marginBottom: 3,
  },
  oddImage: {
    height: 100,
    aspectRatio: 1,
    marginLeft: 2,
    marginBottom: 2,
  },
  firstImage: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
  },
  lastImage: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
});
export default memo(MessageFile);