import { AppButton, AppIcon, AppText, AppView } from '@/components';
import { Icons, isIOS } from '@/themes';
import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';
import { Alert, AppState } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PERMISSIONS, openSettings, request } from 'react-native-permissions';
import { TYPE_MESSAGE } from '@/constants';
import { useMutationMessageActions, useSocketChatMessage } from '@/hooks';
import { SVGChat } from '@/assets/svg/chat';

type TProps = {
  onCloseAddCaption: () => void;
  roomId: string;
}
const ShareLocation = ({ onCloseAddCaption, roomId }: TProps) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Geolocation.GeoCoordinates>();
  const { setDataMessageLocal } = useMutationMessageActions();
  const { onSendMessageSocket } = useSocketChatMessage();
  const _handleSendFile = () => {
    try {
      onCloseAddCaption();
      const formData = new FormData();
      formData.append('type', TYPE_MESSAGE.LOCATION);
      const content = JSON.stringify(location);
      const form = {
        content,
        subType: TYPE_MESSAGE.LOCATION,
        replySender: null,
        idMessage: uuid.v4() as string,
        roomId,
        tag: [],
        caption: '',
      } as TSendMessageSocket;
      setDataMessageLocal(form, roomId);
      onSendMessageSocket(form);
    } catch (error) {

    }

  };
  const getUserLocation = async (): Promise<Geolocation.GeoCoordinates> => {
    return new Promise((resolve, reject) => {
      return Geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
      );
    });
  };

  const requestLocationPermission = async () => {
    if (isIOS) {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result === 'granted') {
        getUserLocation()
          .then(setLocation)
          .catch(() => setLocation(null as any));
      } else {
        openSettings().catch(() => Alert.alert(t('Unable to open settings')))
      }
    } else {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === 'granted') {
        getUserLocation()
          .then(setLocation)
          .catch(() => setLocation(null as any));
      } else {
        openSettings().catch(() => Alert.alert(t('Unable to open settings')))
      }
    }
  };
  useEffect(() => {
    requestLocationPermission();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        nextAppState === 'active'
      ) {
        requestLocationPermission();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <AppView>
        <MapView
          region={{
            latitude: location?.latitude ?? 10.8932085,
            longitude: location?.longitude ?? 10.8932085,
            latitudeDelta: 0.001,
            longitudeDelta: 0.009,
          }}
          mapType={'terrain'}
          maxZoomLevel={16}
          style={{
            height: 220,
          }}
          mapPadding={{
            top: 0,
            right: 0,
            bottom: -25,
            left: 0,
          }}
        >
          <Marker
            coordinate={{
              latitude: location?.latitude ?? 10.8932085,
              longitude: location?.longitude ?? 10.8932085,
            }}
          >
            <SVGChat.LocationChat />
          </Marker>
        </MapView>
        <AppButton flexDirection='row' gap={'base'} marginLeft='base' marginTop='base' onPress={_handleSendFile}>
          <AppView width={40} height={40} borderRadius={'massive'} backgroundColor={'blue'} justifyContent='center' alignItems='center'>
            <AppIcon name={Icons.LocationFill} size={22} color={'white'} />
          </AppView>
          <AppView>
            <AppText variant={'span'} color={'color26'}>{t('Send My Current Location')}</AppText>
            <AppText variant={'small'} color={'backdrop'}>{t('Accurate to 15 metres')}</AppText>
          </AppView>
        </AppButton>
      </AppView>
    </>
  );
};
export default ShareLocation;
