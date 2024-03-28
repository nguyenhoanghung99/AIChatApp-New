import axios from 'axios';
import {useCallback} from 'react';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
const configs = {
  API_URL: Config.ENDPOINT_API_URL,
  GOOGLE_MAP_KEY: Config.GOOGLE_MAP_KEY,
  CHAT_API_URL: 'https://socket-stg.friendify.ai',
  SOCKET_URL: Config.ENDPOINT_SOCKET_URL,
  DEVICE_NAME: DeviceInfo.getDeviceName(),
  DEVICE_ID: DeviceInfo.getDeviceId(),
  PLATFORM: Platform.OS,
  ADDRESS_IP: DeviceInfo.getIpAddress(),
  ANDROID_VERSION: DeviceInfo.getSystemVersion(),
};

const getIpAddress = async () => {
  return (await axios('https://api.ipify.org?format=json'))?.data?.ip;
};

export {configs, getIpAddress};
