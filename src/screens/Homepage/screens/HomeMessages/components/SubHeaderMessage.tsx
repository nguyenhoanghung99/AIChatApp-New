import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {AppIcon, AppText, AppTouchableOpacity, AppView} from '@/components';
import {BaseStyles, FontSizes, Icons, Theme, isIOS, metrics} from '@/themes';
import {Routes, navigate} from '@/navigator';
import {usePermission} from '@/hooks';

type TProps = {};

export default function SubHeaderMessage({}: TProps) {
  const {colors} = useTheme<Theme>();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const {requestCameraPermission} = usePermission();

  return (
    <AppView
      flexDirection="row"
      paddingHorizontal="base"
      paddingBottom="xxs"
      alignItems="center">
      <AppView
        height={40}
        flex={1}
        flexDirection="row"
        alignItems="center"
        backgroundColor="neutralGrey5"
        paddingHorizontal="xs"
        paddingVertical={isIOS ? 'xxs' : 'reset'}
        marginRight="xs"
        borderRadius="sm">
        <AppTouchableOpacity
          flexDirection="row"
          flex={1}
          alignItems="center"
          onPress={() => navigate(Routes.SearchResult)}>
          <AppIcon
            name={Icons.Search}
            size={FontSizes.large}
            color={colors.neutralGrey7}
          />
          <AppText color="color72" variant="rMedium" marginLeft="sm">
            {t('Search')}
          </AppText>
          {/* <TextInput
            ref={inputRef}
            style={[BaseStyles.flex1, {paddingHorizontal: metrics.xxs}]}
            placeholder={t('Search') as string}
            pointerEvents="none"
            focusable={false}
          /> */}
        </AppTouchableOpacity>

        <AppTouchableOpacity
          onPress={() =>
            requestCameraPermission(() => navigate(Routes.QrCodeScan))
          }>
          <AppIcon
            name={Icons.Scan}
            color={colors.black}
            size={FontSizes.large}
          />
        </AppTouchableOpacity>
      </AppView>
      <AppView flexDirection="row" gap="base">
        <AppTouchableOpacity onPress={() => navigate(Routes.Contacts)}>
          <AppIcon
            name={Icons.Contact}
            size={FontSizes.large}
            color={colors.black}
          />
        </AppTouchableOpacity>
        <AppTouchableOpacity onPress={() => {}}>
          <AppIcon
            name={Icons.AddFriend}
            size={FontSizes.large}
            color={colors.black}
          />
        </AppTouchableOpacity>
      </AppView>
    </AppView>
  );
}
