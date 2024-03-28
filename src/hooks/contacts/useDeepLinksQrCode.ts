import {CHAT_MESSAGE_TYPE, QueryKeys} from '@/constants';
import {UserService} from '@/services';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import queryString from 'query-string';
import {Routes, navigate} from '@/navigator';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-simple-toast';

const useDeepLinksQrCode = () => {
  const {t} = useTranslation();

  useEffect(() => {
    const findUserById = async (code: string) => {
      try {
        const response = await UserService.findUserById(code);
        if (response?.data?.length) {
          navigate(Routes.ChatOneUser, {
            type: CHAT_MESSAGE_TYPE.ONE_CHAT,
            avatar: response.data?.[0].avatar,
            roomName: response.data?.[0].fullName,
            screen: Routes.SearchResult,
            idUser: response.data?.[0]._id,
          });
        } else {
          Toast.show(t('Not found user'), Toast.SHORT);
        }
      } catch (error) {
        Toast.show(t('Please try again!'), Toast.SHORT);
      }
    };

    Linking.addEventListener('url', ({url}) => {
      const idUser = queryString.parseUrl(url)?.query?.id + '';
      console.log('DeepLink QrCode:', idUser);
      if (idUser?.length > 0) {
        findUserById(idUser);
      }
    });
  }, []);
};

export default useDeepLinksQrCode;
