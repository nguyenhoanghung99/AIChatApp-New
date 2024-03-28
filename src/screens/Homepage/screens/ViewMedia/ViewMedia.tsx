import React, {useEffect, useRef} from 'react';
import {
  AppButton,
  AppFastImage,
  AppIcon,
  AppSafeAreaView,
  AppView,
} from '@/components';
import {EMediaType} from '@/constants';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/core';
import {AppStackParamList, goBack} from '@/navigator';
import {Icons, height, width} from '@/themes';
import {StatusBar} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

export default function ViewMedia() {
  const {params} = useRoute<RouteProp<AppStackParamList, 'ViewMedia'>>();
  const isFocus = useIsFocused();
  const videoRef = useRef<VideoRef>(null);
  useEffect(() => {
    return () => videoRef?.current?.pause();
  }, [params]);
  return (
    <AppSafeAreaView backgroundColor="black" flex={1} justifyContent="center">
      {isFocus && (
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
      )}
      <AppButton
        backgroundColor={'backdrop'}
        zIndex={1000}
        padding={'base'}
        onPress={() => goBack()}
        position={'absolute'}
        top={20}>
        <AppIcon name={Icons.ChevronLeft} size={24} color={'white'} />
      </AppButton>
      {params.type === EMediaType.VIDEO ? (
        <Video
          source={{uri: params?.url}} // the video file
          resizeMode={'cover'}
          paused={false}
          ref={videoRef}
          style={{
            width: '100%',
            height: '50%',
          }}
        />
      ) : (
        <AppFastImage
          source={{uri: params.url}}
          style={{
            width: width,
            height: height,
          }}
          resizeMode="contain"
        />
      )}
    </AppSafeAreaView>
  );
}
