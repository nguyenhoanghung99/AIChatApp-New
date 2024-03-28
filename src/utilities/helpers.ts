import {isIOS} from '@/themes';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {PermissionsAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-blob-util';
import Share from 'react-native-share';

export const SOME_THING_WENT_WRONG =
  'Something went wrong, please try again later!';
export const SMS_MESS =
  'Let’s chat on Friendify. This AI is awesome. Join me Download it here: https://link.friendify.ai/s7Jh';

export const messagePermissionAndroid = {
  10: 'Permissions > Storage > Allow',
  11: 'Permissions > Files and media > Allow access to media only',
  12: 'Permissions > Files and media > Allow access to media only',
  13: 'Permissions > Photos and videos > Allow',
  default: 'Permissions > Photos and videos > Allow',
};

export const handleDownload = async (
  imgUrl: string,
  onPermissionDeny?: () => void,
  isCustom = false,
) => {
  const androidVersion = DeviceInfo.getSystemVersion();
  try {
    if (!isIOS) {
      const grant = await PermissionsAndroid.request(
        Number(androidVersion) > 12
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (grant !== PermissionsAndroid.RESULTS.GRANTED) {
        return onPermissionDeny && onPermissionDeny();
      }
      const image = imgUrl;
      if (isCustom) {
        await CameraRoll.save(image);
        Toast.show('Downloaded', Toast.LONG);
      } else {
        RNFetchBlob.config({
          fileCache: true,
          appendExt: 'png',
        })
          .fetch('GET', image)
          .then(async res => {
            const imagePath = res.path();
            CameraRoll.save(imagePath, {
              type: 'photo',
              album: 'Friendify',
            });
            Toast.show('Downloaded', Toast.LONG);
          })
          .catch(err => {
            console.log('error', err);
          });
      }
    } else {
      await CameraRoll.save(imgUrl);
      Toast.show('Downloaded', Toast.LONG);
    }
  } catch (error: any) {
    if (error?.code === 'E_PHOTO_LIBRARY_AUTH_DENIED') {
      return onPermissionDeny && onPermissionDeny();
    }
    Toast.show(SOME_THING_WENT_WRONG, Toast.SHORT);
  }
};

export const downloadImage = async (url: string) => {
  return RNFetchBlob.fetch('GET', url).then(res => res.data);
};

export type SHARE_TYPE = 'text' | 'image';
export const handleShare = async (
  type: SHARE_TYPE,
  data: string,
  cb?: () => void,
  messageImage?: string,
) => {
  let shareOptions = null;

  if (type === 'text') {
    shareOptions = {
      failOnCancel: true,
      message: data,
      title: data,
    };
  } else if (type === 'image') {
    const url = data;
    const base64 = await downloadImage(url);
    shareOptions = {
      failOnCancel: true,
      message: messageImage || '',
      url: 'data:image/png;base64,' + base64,
    };
  }
  if (!shareOptions) {
    return false;
  }
  return Share.open(shareOptions)
    .then(() => cb?.())
    .catch(() => cb?.());
};
