import {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const useConfigGoogle = () => {
  const GOOGLE_SIGNIN_CLIENT_ID =
    '411754907720-as3oup71hh0chhjun3ebi4kiscgmeopm.apps.googleusercontent.com';

  const settingConfigs = () => {
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_SIGNIN_CLIENT_ID,
        forceCodeForRefreshToken: true,
        profileImageSize: 120,
      });
    } catch (error) {
      console.error('Setting configs google', error);
    }
  };

  useEffect(() => {
    settingConfigs;
  }, []);
};
