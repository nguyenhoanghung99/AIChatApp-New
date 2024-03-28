import React, { memo, useRef } from 'react';
import { AppSwipeableReply, AppView } from '@/components';
import { _format } from '@/utilities';
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import MapView, { Marker } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';
import { isIOS, responsiveWidth } from '@/themes';
import { Linking, StyleSheet } from 'react-native';
import { SVGChat } from '@/assets/svg/chat';

type TProps = {
} & TMessageProps;
function MessageLocation({
  content,
  justify,
  avatar,
  isMyMessage,
  message,
  idMessage,
}: TMessageProps) {
  const swipeableRowRef = useRef<Swipeable | null>(null);
  const location = JSON.parse(content);
  const openGps = () => {
    const scheme = isIOS ? 'maps:' : 'geo:';
    const url = scheme + `${location?.latitude},${location?.longitude}`;
    Linking.openURL(url);
  }
  return (
    <AppSwipeableReply
      isMyMessage={isMyMessage}
      key={`media${idMessage}`}
      swipeableRowRef={swipeableRowRef}
      message={message}>
      <Animated.View style={[{ justifyContent: justify }, styles.container]}>
        <AppView key={`location${idMessage}`}>
          <MapView
            onPress={openGps}
            region={{
              latitude: location?.latitude ?? 10.8932085,
              longitude: location?.longitude ?? 106.5855341,
              latitudeDelta: 0.001,
              longitudeDelta: 0.009,
            }}
            maxZoomLevel={16}
            scrollEnabled={false}
            style={{
              height: 200,
              aspectRatio: 1
            }}
            mapPadding={{
              top: 0,
              right: 0,
              bottom: -25,
              left: 0,
            }}
            mapType={'terrain'}
          >
            <Marker
              coordinate={{
                latitude: location?.latitude ?? 10.8932085,
                longitude: location?.longitude ?? 106.5855341,
              }}
            >
              <SVGChat.LocationChat />
            </Marker>
          </MapView>
        </AppView>
      </Animated.View>
    </AppSwipeableReply>

  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: responsiveWidth(8),
    paddingHorizontal: responsiveWidth(16),
    marginBottom: responsiveWidth(6),
  },
});
export default memo(MessageLocation);

