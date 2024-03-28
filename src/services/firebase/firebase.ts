import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {container} from 'tsyringe';
import {Storage} from '@/utilities';
import {StorageKeys} from '@/constants';
const handleClickNotification = (value: any) => {
  console.log('handleClickNotification', value);
};
const onNotifeeMessageReceived = async (message: any) => {
  const channelId = await notifee.createChannel({
    id: '',
    name: '',
    importance: AndroidImportance.HIGH,
    vibration: true,
    sound: 'noti',
  });
  await notifee.displayNotification({
    id: message.messageId,
    title: message.data.title ?? message.notification.title,
    body: message.data.body ?? message.notification.body,
    data: message.data,
    android: {
      channelId: channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
      sound: 'noti',
    },
    ios: {
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
      sound: 'noti.nav',
    },
  });
};
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
};
const storage = container.resolve(Storage);
const getFcmToken = async () => {
  let checkToken = storage.getItem(StorageKeys.FCM_TOKEN);
  try {
    const fcmToken = await messaging().getToken();
    if (!checkToken) {
      await storage.setItem(StorageKeys.FCM_TOKEN, JSON.stringify(fcmToken));
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  onNotifeeMessageReceived,
  handleClickNotification,
  requestUserPermission,
};
