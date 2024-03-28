import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  AppAvatar,
  AppFlashlist,
  AppIcon,
  AppNoData,
  AppPressable,
  AppSafeAreaView,
  AppText,
  AppTouchableOpacity,
  AppView,
} from '@/components';
import {BaseStyles, FontSizes, Icons, Theme, isIOS, metrics} from '@/themes';
import {useTheme} from '@shopify/restyle';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-gesture-handler';
import {Routes, goBack, navigate} from '@/navigator';
import {useSearchUser} from '@/hooks';
import {ListRenderItem} from '@shopify/flash-list';
import {CHAT_MESSAGE_TYPE} from '@/constants';

export default function SearchResult() {
  const {colors} = useTheme<Theme>();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);

  const {
    setKeyword,
    fetchNextPage,
    listUser,
    refetch,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useSearchUser();

  const renderItem = useCallback(({item}: {item: TUser}) => {
    return (
      <AppPressable
        onPress={() =>
          navigate(Routes.ChatOneUser, {
            type: CHAT_MESSAGE_TYPE.ONE_CHAT,
            avatar: item?.avatar,
            roomName: item?.fullName,
            screen: Routes.SearchResult,
            idUser: item?._id,
          })
        }
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="base"
        paddingHorizontal="base"
        backgroundColor="white"
        paddingTop="sm">
        <AppView flexDirection="row" alignItems="center" gap="base" flex={1}>
          <AppAvatar
            borderRadius={100}
            width={52}
            height={52}
            avatar={item?.avatar}
          />
          <AppView flex={1}>
            <AppText color="black" variant="sMedium" numberOfLines={1}>
              {item.fullName}
            </AppText>
          </AppView>
        </AppView>
        <AppView flexDirection="row" alignItems="center" gap="tiny">
          <AppTouchableOpacity
            backgroundColor="lightLink"
            paddingHorizontal="sm"
            height={32}
            alignItems="center"
            justifyContent="center"
            borderRadius="sm">
            <AppText color="white" variant="span">
              {t('Add')}
            </AppText>
          </AppTouchableOpacity>
        </AppView>
      </AppPressable>
    );
  }, []);

  return (
    <AppSafeAreaView flex={1} style={{backgroundColor: 'white'}}>
      <AppView backgroundColor="white" flex={1}>
        <AppView paddingHorizontal="base" marginTop="base" height={50}>
          <AppView
            flexDirection="row"
            alignItems="center"
            paddingBottom="tiny"
            paddingTop="tiny"
            backgroundColor="white">
            <AppView
              flex={1}
              height={40}
              flexDirection="row"
              alignItems="center"
              backgroundColor="neutralGrey5"
              paddingHorizontal="sm"
              marginRight="xs"
              borderRadius="sm">
              <AppTouchableOpacity onPress={() => inputRef.current?.focus()}>
                <AppIcon
                  name={Icons.Search}
                  size={FontSizes.large}
                  color={colors.neutralGrey7}
                />
              </AppTouchableOpacity>
              <TextInput
                autoFocus
                ref={inputRef}
                style={[BaseStyles.flex1, {paddingHorizontal: metrics.xxs}]}
                placeholder={t('Search by ID, name') as string}
                onChangeText={e => setKeyword(e)}
              />
              <AppTouchableOpacity onPress={() => navigate(Routes.QrCodeScan)}>
                <AppIcon
                  color={colors.black}
                  name={Icons.Scan}
                  size={FontSizes.large}
                />
              </AppTouchableOpacity>
            </AppView>
            <AppTouchableOpacity onPress={goBack}>
              <AppText color="lightLink" variant="spanSemibold">
                {t('Cancel')}
              </AppText>
            </AppTouchableOpacity>
          </AppView>
        </AppView>
        <AppView flex={1} flexDirection="column" justifyContent="center">
          <AppFlashlist
            data={listUser}
            renderItem={renderItem as ListRenderItem<TUser | unknown>}
            estimatedItemSize={50}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
            isRefetching={isRefetching}
            refetch={refetch}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
          />
        </AppView>
      </AppView>
    </AppSafeAreaView>
  );
}
