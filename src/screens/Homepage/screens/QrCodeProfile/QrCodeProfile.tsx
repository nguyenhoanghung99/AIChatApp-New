import QRCode from 'react-native-qrcode-svg';
import {
  AppAvatar,
  AppChatHeader,
  AppIcon,
  AppSafeAreaView,
  AppScrollView,
  AppText,
  AppTouchableOpacity,
  AppView,
} from '@/components';
import Share from 'react-native-share';
import ScreenHeader from '@/components/AppHeader/ScreenHeader';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {
  BaseStyles,
  FontSizes,
  Icons,
  Images,
  Theme,
  height,
  metrics,
  width,
} from '@/themes';
import {useTheme} from '@shopify/restyle';
import React, {useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-gesture-handler';
import {Routes, goBack, navigate} from '@/navigator';
import {useActionsQrCode, usePermission} from '@/hooks';
import {SMS_MESS, handleDownload} from '@/utilities';
import {useAuthStore} from '@/stores';

export default function QrCodeProfile() {
  const {colors} = useTheme<Theme>();
  const inputRef = useRef<TextInput>(null);
  const {t} = useTranslation();
  const {requestCameraPermission} = usePermission();
  const refViewShot = useRef<any>(null);
  const prevRef = useRef({isShare: false}).current;
  const {handleShare, regenerateQr, saveImage} = useActionsQrCode();
  const {userInfo} = useAuthStore(state => state);

  const linkQr = useMemo(
    () => `https://app-v2.friendify.ai/deeplink?id=${userInfo?._id}`,
    [userInfo],
  );

  const LIST_ACTION = useMemo(
    () => [
      {
        id: 1,
        title: t('Download'),
        icon: Icons.Download,
        action: () => saveImage(refViewShot),
      },
      {
        id: 2,
        title: t('Share'),
        icon: Icons.Share,
        action: () => handleShare(prevRef, refViewShot),
      },
      {id: 3, title: t('Update'), icon: Icons.Refesh, action: regenerateQr},
    ],
    [],
  );

  return (
    <AppSafeAreaView backgroundColor="bgBlack" flex={1} edges={['top']}>
      <ScreenHeader
        leftOpt={
          <AppTouchableOpacity
            onPress={goBack}
            hitSlop={{top: 40, left: 40, right: 40, bottom: 40}}>
            <AppIcon size={18} color={colors.black} name={Icons.ChevronLeft} />
          </AppTouchableOpacity>
        }
        isShowDiamond
      />
      <AppView height={height - 56}>
        <AppView paddingHorizontal="base">
          <AppView
            flexDirection="row"
            paddingHorizontal="base"
            alignItems="center"
            backgroundColor="neutralGrey5"
            borderRadius="sm">
            <AppTouchableOpacity onPress={() => inputRef.current?.focus()}>
              <AppIcon
                name={Icons.Search}
                size={FontSizes.large}
                color={colors.neutralGrey7}
              />
            </AppTouchableOpacity>
            <TextInput
              ref={inputRef}
              style={[BaseStyles.flex1, {paddingHorizontal: metrics.xxs}]}
              placeholder={t('Search by ID, email') as string}
            />
          </AppView>
        </AppView>

        <AppView
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="md"
          mt="sm"
          backgroundColor="neutralGrey5">
          <AppView
            backgroundColor="white"
            padding="lg"
            style={{marginTop: -50}}
            borderRadius="base">
            <QRCode
              value={linkQr}
              logo={Images.logoRound}
              backgroundColor="white"
              size={200}
            />
          </AppView>

          <AppText color="black" variant="headingS2">
            {userInfo?.fullName}
          </AppText>
          <AppView
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            width={width}>
            {LIST_ACTION.map(item => (
              <AppTouchableOpacity
                key={item.id}
                flexDirection="column"
                alignItems="center"
                flex={1}
                onPress={item.action}>
                <AppView
                  backgroundColor="white"
                  width={44}
                  height={44}
                  borderRadius="massive"
                  alignItems="center"
                  justifyContent="center">
                  <AppIcon name={item.icon} size={20} color={colors.black} />
                </AppView>
                <AppText color="color26" marginTop="tiny" variant="sMedium">
                  {item.title}
                </AppText>
              </AppTouchableOpacity>
            ))}
          </AppView>
        </AppView>

        <AppView
          flexDirection="row"
          width={width}
          alignItems="center"
          marginVertical="sm"
          justifyContent="space-around">
          <AppTouchableOpacity
            height={40}
            borderRadius="massive"
            justifyContent="center"
            alignItems="center"
            onPress={() => navigate(Routes.QrCodeProfile)}>
            <AppIcon name={Icons.Qrcode} size={20} color={colors.black} />
            <AppText color="black" variant="rSmall" mt="tiny">
              {t('My QR Code')}
            </AppText>
          </AppTouchableOpacity>
          <AppTouchableOpacity
            height={40}
            borderRadius="massive"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            onPress={() =>
              requestCameraPermission(() => navigate(Routes.QrCodeScan))
            }>
            <AppIcon name={Icons.Scan} size={20} color={colors.neutralGrey6} />
            <AppText color="neutralGrey6" variant="rSmall" mt="tiny">
              {t('Scan QR Code')}
            </AppText>
          </AppTouchableOpacity>
        </AppView>

        {/* Capture Qr Code Profile */}
        <ViewShot
          ref={refViewShot}
          style={{
            position: 'absolute',
            right: -1000,
          }}>
          <AppView
            backgroundColor="lightLink"
            flexDirection="column"
            justifyContent="center"
            gap="base"
            alignItems="center"
            borderRadius="base"
            margin="base"
            padding="base"
            overflow="hidden">
            <AppView
              flexDirection="column"
              justifyContent="center"
              alignItems="center">
              <AppAvatar
                avatar={userInfo.avatar}
                width={45}
                height={45}
                borderRadius={50}
              />
              <AppText color="white" variant="sMedium">
                {userInfo?.fullName}
              </AppText>
            </AppView>
            <AppView
              backgroundColor="white"
              borderRadius="base"
              padding="base"
              style={{
                overflow: 'hidden',
              }}>
              <QRCode
                value={linkQr}
                logo={Images.logoRound}
                backgroundColor="white"
                size={150}
              />
            </AppView>
            <AppText color="white" variant="span">
              {t('Scan this QR code to add me on Friendify')}
            </AppText>
          </AppView>
        </ViewShot>
      </AppView>
    </AppSafeAreaView>
  );
}
