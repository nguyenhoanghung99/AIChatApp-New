import {useEffect} from 'react';
import notifee, {EventType, Event} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {
  requestUserPermission,
  handleClickNotification,
  onNotifeeMessageReceived,
} from '@/services/firebase';

export const useSetupReceviceNotification = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);
  useEffect(() => {
    const unsubscribe = () => {
      return notifee.onForegroundEvent(async ({type, detail}: Event) => {
        const {pressAction} = detail;
        switch (type) {
          case EventType.DISMISSED:
            notifee.cancelNotification(detail?.notification?.id as string);
            break;
          case EventType.PRESS:
            if (pressAction?.id === 'mark_as_read') {
              await notifee.decrementBadgeCount();
              if (!detail?.notification?.id) {
                return;
              }
              await notifee.cancelNotification(detail?.notification?.id);
            } else {
              handleClickNotification(detail.notification);
            }
            break;
          default:
            break;
        }
      });
    };
    unsubscribe();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(onNotifeeMessageReceived);
    messaging().setBackgroundMessageHandler(onNotifeeMessageReceived);
    return unsubscribe;
  }, []);
};
