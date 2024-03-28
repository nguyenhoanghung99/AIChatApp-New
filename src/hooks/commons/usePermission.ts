import {Routes, navigate} from '@/navigator';
import {useModalStore} from '@/stores';
import {PermissionsAndroid} from 'react-native';

export const usePermission = () => {
  const {setIsShowGoSetting} = useModalStore();

  const requestCameraPermission = async (cb?: () => void) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cb?.();
      } else {
        setIsShowGoSetting();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return {requestCameraPermission};
};
