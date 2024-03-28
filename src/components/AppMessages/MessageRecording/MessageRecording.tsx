import React, { Dispatch, SetStateAction, memo, useCallback, useEffect, useRef, useState } from 'react';
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
import { SVGChat } from '@/assets/svg/chat';
import AudioRecorderPlayer from 'react-native-sound';
import dayjs from 'dayjs';
import { secondsToHms } from '@/utilities';

type TProps = {
} & TMessageProps;
function MessageRecording({
  content,
  justify,
  avatar,
  isMyMessage,
  message,
  idMessage,
}: TProps) {
  const swipeableRowRef = useRef<Swipeable | null>(null);
  const sources = JSON.parse(content);
  const data = sources?.data?.length ? sources.data[0] : '';
  let audioRecorderPlayer: AudioRecorderPlayer | null = null;
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    _getDuration();
  }, []);

  const _getDuration = () => {
    audioRecorderPlayer = new AudioRecorderPlayer(data.url ?? '', AudioRecorderPlayer.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      setDuration(audioRecorderPlayer?.getDuration() ?? 0);
    });
  }
  const onStartPlay = useCallback(() => {
    try {
      audioRecorderPlayer?.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } catch (err) {
      console.log('startPlayer error', err);
    }
  }, [message]);

  return (
    <AppSwipeableReply
      key={`MessageRecording${idMessage}`}
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
          // onPress={onStartPlay}
          borderRadius="base">
          <AppView
            flexDirection='row'
            gap={'xxs'}
          >
            <SVGChat.AudioIcon />
            <AppText>{`${secondsToHms(duration)}`}</AppText>
          </AppView>
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
export default memo(MessageRecording);