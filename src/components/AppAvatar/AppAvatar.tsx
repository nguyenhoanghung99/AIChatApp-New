import React from 'react';
import FastImage from 'react-native-fast-image';
import { AppView } from '@/components';
import { responsiveHeight, responsiveWidth } from '@/themes';

type TProps = {
  height?: number;
  width?: number;
  borderRadius?: number;
  avatar?: string;
  isOnline?: boolean;
  bottom?: number;
  right?: number;
};
export default function AppAvatar({
  height = 35,
  width = 35,
  borderRadius = 35,
  avatar,
  isOnline,
  bottom = -responsiveHeight(4),
  right = -responsiveHeight(2),
}: TProps) {
  return (
    <AppView position="relative">
      <FastImage
        fallback
        source={{
          uri:
            avatar ||
            'https://friendify-bucket.s3.ap-southeast-1.amazonaws.com/files/1.png',
          cache: FastImage.cacheControl.cacheOnly,
          priority: FastImage.priority.high,
        }}
        style={{
          width: responsiveHeight(width),
          height: responsiveHeight(height),
          borderRadius: responsiveHeight(borderRadius / 2),
        }}
        resizeMode="cover"
      />
      {isOnline && (
        <AppView
          position="absolute"
          height={responsiveHeight(14)}
          width={responsiveWidth(14)}
          style={{ borderRadius: responsiveHeight(14 / 2) }}
          backgroundColor="white"
          alignItems="center"
          justifyContent="center"
          bottom={bottom}
          right={right}>
          <AppView
            height={responsiveHeight(10)}
            width={responsiveWidth(10)}
            style={{ borderRadius: responsiveHeight(10 / 2) }}
            backgroundColor="lightLink"
          />
        </AppView>
      )}
    </AppView>
  );
}
