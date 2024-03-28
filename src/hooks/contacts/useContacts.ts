import {useModalStore} from '@/stores';
import {isIOS} from '@/themes';
import {useState} from 'react';
import {requestPermission} from 'react-native-contacts';
import Contacts from 'react-native-contacts';
import {PERMISSIONS, request} from 'react-native-permissions';
const useContacts = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const {setIsShowGoSetting} = useModalStore();

  const requestContactPermission = async () => {
    if (isIOS) {
      const result = await requestPermission();
      if (result === 'authorized') {
        Contacts.getAll()
          .then(setContacts)
          .catch(e => {
            console.log('Get contact error', e);
          });
      } else {
        setIsShowGoSetting();
      }
    } else {
      const result = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
      if (result !== 'granted') {
        return setIsShowGoSetting();
      } else {
        Contacts.getAll()
          .then(setContacts)
          .catch(e => {
            console.log('Get contact error', e);
          });
      }
    }
  };

  return {contacts, setContacts, requestContactPermission};
};

export default useContacts;
