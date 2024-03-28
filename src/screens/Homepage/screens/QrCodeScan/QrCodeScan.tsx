import React, {useEffect, useRef, useState} from 'react';
import {
  AppIcon,
  AppSafeAreaView,
  AppText,
  AppTouchableOpacity,
  AppView,
} from '@/components';
import {FontSizes, Icons, Images, Theme, height, width} from '@/themes';
import {Image} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@shopify/restyle';
import {navigate, goBack} from '@/navigator/NavigationService';
import {Routes} from '@/navigator';
import {BarCodeReadEvent} from 'react-native-camera';
import {RNCamera} from 'react-native-camera';
import Toast from 'react-native-simple-toast';
import queryString from 'query-string';
import {CHAT_MESSAGE_TYPE, QueryKeys} from '@/constants';
import {UserService} from '@/services';
import {useQueryClient} from '@tanstack/react-query';
import {useAuthStore} from '@/stores';

export default function QrCodeScan() {
  const {t} = useTranslation();
  const {colors} = useTheme<Theme>();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [flashMode, setFlashMode] = useState(false);
  const queryClient = useQueryClient();
  const {userInfo} = useAuthStore();

  const onSuccess = (e: BarCodeReadEvent) => {
    setCode(queryString.parseUrl(e.data)?.query?.id + '');
  };

  useEffect(() => {
    const findUserById = async () => {
      try {
        const response = await queryClient.fetchQuery<TListResponse<TUser>>({
          queryKey: [QueryKeys.FIND_USER],
          queryFn: () => UserService.findUserById(code),
        });
        console.log('RESPONSE', response);
        if (response?.data?.length) {
          setCode('');
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
    if (code?.length > 0) {
      if (code === userInfo?._id) {
        return Toast.show(t('Please scan other users'), Toast.SHORT);
      }
      findUserById();
    }
  }, [code]);

  return (
    <AppSafeAreaView backgroundColor="bgBlack" flex={1}>
      <QRCodeScanner
        cameraStyle={{height: height}}
        reactivate={true}
        reactivateTimeout={1000 * 1}
        onRead={onSuccess}
        flashMode={
          flashMode
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
      />
      <AppView
        position="absolute"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        width={width}
        height={height}>
        <AppView
          flexDirection="row"
          mt="huge"
          width={width}
          paddingHorizontal="sm"
          justifyContent="space-between">
          <AppTouchableOpacity
            backgroundColor="colorBF"
            width={40}
            height={40}
            borderRadius="massive"
            justifyContent="center"
            alignItems="center"
            onPress={goBack}>
            <AppIcon name={Icons.Close} color={colors.black} />
          </AppTouchableOpacity>
          <AppView
            height={40}
            paddingHorizontal="sm"
            borderRadius="massive"
            alignItems="center"
            flexDirection="row"
            gap="sm"
            backgroundColor="colorBF">
            <AppIcon
              name={Icons.Scan}
              color={colors.black}
              size={FontSizes.large}
            />
            <AppText color="black" variant="sMedium">
              {t('Scan QR Code')}
            </AppText>
          </AppView>
          <AppTouchableOpacity
            backgroundColor="colorBF"
            width={40}
            height={40}
            borderRadius="massive"
            justifyContent="center"
            alignItems="center"
            onPress={() => setFlashMode(pre => !pre)}>
            <AppIcon
              name={flashMode ? Icons.EyeOn : Icons.EyeOff}
              color={colors.black}
            />
          </AppTouchableOpacity>
        </AppView>

        <AppView
          flexDirection="column"
          gap="md"
          alignItems="center"
          justifyContent="space-between">
          <AppText color="white" variant="sMedium">
            {t('Point Camera at QR code')}
          </AppText>
          <AppView>
            <Image source={Images.boxScan} />
          </AppView>
        </AppView>

        <AppView
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="tiny">
          <AppTouchableOpacity
            backgroundColor="colorBF"
            height={40}
            width={190}
            gap="sm"
            borderRadius="massive"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            onPress={() => {}}>
            <AppIcon name={Icons.Photo} size={20} color={colors.black} />
            <AppText color="black" variant="sMedium">
              {t('Select from album')}
            </AppText>
          </AppTouchableOpacity>
          <AppView
            flexDirection="row"
            width={width}
            alignItems="center"
            marginTop="sm"
            justifyContent="space-around">
            <AppTouchableOpacity
              height={40}
              borderRadius="massive"
              justifyContent="center"
              alignItems="center"
              onPress={() => navigate(Routes.QrCodeProfile)}>
              <AppIcon
                name={Icons.Qrcode}
                size={20}
                color={colors.neutralGrey8}
              />
              <AppText color="neutralGrey8" variant="rSmall" mt="tiny">
                {t('My QR Code')}
              </AppText>
            </AppTouchableOpacity>
            <AppTouchableOpacity
              height={40}
              borderRadius="massive"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              onPress={() => {}}>
              <AppIcon name={Icons.Scan} size={20} color={colors.white} />
              <AppText color="white" variant="rSmall" mt="tiny">
                {t('Scan QR Code')}
              </AppText>
            </AppTouchableOpacity>
          </AppView>
        </AppView>
      </AppView>
    </AppSafeAreaView>
  );
}
