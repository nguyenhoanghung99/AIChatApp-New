import React, { memo, useRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  AppAvatar,
  AppButton,
  AppFastImage,
  AppPressable,
  AppText,
  AppView,
} from '@/components';
import AppSwipeableReply from '@/components/AppSwipeable/AppSwipeableReply';
import { Images, responsiveHeight, responsiveWidth, width } from '@/themes';
import { EMediaType } from '@/constants';
import Video from 'react-native-video';
import { Routes, navigate } from '@/navigator';

type TProps = {
} & TMessageProps;
function MessageMedia({
  content,
  justify,
  avatar,
  isMyMessage,
  message,
  idMessage,
}: TProps) {
  const swipeableRowRef = useRef<Swipeable | null>(null);
  const sources = JSON.parse(content);
  return (
    <AppSwipeableReply
      isMyMessage={isMyMessage}
      key={`media${idMessage}`}
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
          <AppView
            flexDirection='row'
            flexWrap={'wrap'}
            flex={1}
            justifyContent={'space-between'}
          >
            {
              sources?.data?.length && sources?.data?.map((item: any, i: any) => {
                const _url = typeof item === 'string' ? item : item?.url;
                const _type = typeof item === 'string' ? '' : item?.type;
                return (
                  _type === EMediaType.VIDEO ?
                    <AppButton justifyContent='center' alignItems='center' opacity={.95} onPress={() => navigate(Routes.ViewMedia, {
                      type: EMediaType.VIDEO,
                      url: _url
                    })}>
                      <Video
                        key={`body-media${i}${idMessage}`}
                        source={{ uri: _url }}      
                        resizeMode={'cover'}
                        paused={true}
                        style={styles.msgImage}
                      />
                      <AppButton position={'absolute'}>
                        <Image source={Images.playVideo} style={{
                          width: responsiveWidth(25),
                          height: responsiveWidth(25),
                        }} />
                      </AppButton>
                    </AppButton>
                    :
                    <AppButton
                      onPress={() => navigate(Routes.ViewMedia, {
                        type: EMediaType.IMAGE,
                        url: _url
                      })}
                    >
                      <AppFastImage
                        source={{ uri: _url }}
                        key={`body-media${i}${idMessage}`}
                        style={[
                          sources?.data?.length === 1 ? styles.msgImage :
                            sources?.data?.length === 2 ? styles.evenImage :
                              sources?.data?.length === 3 ? styles.oddImage : styles.oddImage
                        ]}
                        resizeMode="cover"
                      />
                    </AppButton>
                )
              })}

          </AppView>
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
    height: 300,
    aspectRatio: 0.75,
    borderRadius: 8,
    marginLeft: 3,
    overflow: 'hidden',
  },
  evenImage: {
    height: 100,
    aspectRatio: 1,
    marginLeft: 3,
    marginBottom: 3,
  },
  oddImage: {
    height: 90,
    aspectRatio: 1,
    marginLeft: 3,
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
export default memo(MessageMedia);