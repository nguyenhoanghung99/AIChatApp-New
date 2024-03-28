/**
 * @format
 */
import 'reflect-metadata';
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';
import {
  onNotifeeMessageReceived,
  handleClickNotification,
} from './src/services/firebase';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
messaging().setBackgroundMessageHandler(onNotifeeMessageReceived);

notifee.onBackgroundEvent(async ({ type, detail }) => {
  switch (type) {
    case EventType.DISMISSED:
      await notifee.cancelNotification(detail.notification.id);
      break;
    case EventType.PRESS:
      if (detail?.pressAction === 'mark_as_read') {
        console.log('mark as read');
        await notifee.decrementBadgeCount();
        await notifee.cancelNotification(detail.notification.id);
      } else {
        handleClickNotification(detail.notification);
      }
      break;
    default:
      break;
  }
});
AppRegistry.registerComponent(appName, () => App);
