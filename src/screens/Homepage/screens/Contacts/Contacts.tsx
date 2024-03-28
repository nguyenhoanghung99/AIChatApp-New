import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  AppAvatar,
  AppFlashlist,
  AppIcon,
  AppNoData,
  AppPressable,
  AppSafeAreaView,
  AppSwipeable,
  AppText,
  AppTouchableOpacity,
  AppView,
} from '@/components';
import { BaseStyles, FontSizes, Icons, Theme, metrics, responsiveHeight } from '@/themes';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { Swipeable, TextInput } from 'react-native-gesture-handler';
import { Routes, goBack, navigate } from '@/navigator';
import { Platform, StyleSheet } from 'react-native';

export default function Contacts() {
  const { colors } = useTheme<Theme>();
  const { t } = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const swipeContactRef = useRef<Swipeable | null>(null);
  const [data, setData] = useState([]);

  const MENUS_ACTION = useMemo(
    () => [
      {
        title: t('Friend Request'),
        icon: (
          <AppIcon size={20} name={Icons.AddFriend} color={colors.lightLink} />
        ),
        onPress: () => navigate(Routes.FriendsRequest),
      },
      {
        title: t('Invite Friends'),
        icon: (
          <AppIcon size={20} name={Icons.AddFriend} color={colors.lightLink} />
        ),
        onPress: () => navigate(Routes.InviteFriends),
      },
    ],
    [],
  );

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <AppSwipeable
        roomId=''
        key={item._id}
        _swipeRef={swipeContactRef}
        isPin={false}
        isMute={false}>
        <AppPressable
          flexDirection="row"
          alignItems="center"
          gap="base"
          paddingHorizontal="base"
          backgroundColor="white"
          paddingTop="sm">
          <AppAvatar
            borderRadius={100}
            width={52}
            height={52}
            avatar="https://www.vietnamfineart.com.vn/wp-content/uploads/2023/07/anh-gai-xinh-vn-3.jpg"
          />
          <AppText color="black" variant="sMedium">
            Người yêu
          </AppText>
        </AppPressable>
      </AppSwipeable>
    );
  }, []);

  return (
    <AppSafeAreaView flex={1} style={{ backgroundColor: 'white' }}>
      <AppView backgroundColor="white" flex={1}>
        <AppView
          paddingHorizontal="base"
          flexDirection="row"
          alignItems="center"
          paddingBottom="base">
          <AppTouchableOpacity
            onPress={goBack}>
            <AppIcon
              name={Icons.Close}
              color={colors.black}
              size={FontSizes.span}
            />
          </AppTouchableOpacity>
          <AppView
            flex={1}
            flexDirection="row"
            alignContent="center"
            justifyContent="center"
            marginRight="md">
            <AppText variant="heading3" color="black" textAlign="center">
              {t('Contacts')}
            </AppText>
          </AppView>
        </AppView>

        <AppView paddingHorizontal="base" height={40}>
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
              style={[BaseStyles.flex1, { paddingHorizontal: metrics.xxs }, styles.input]}
              placeholder={t('Search') as string}
            />
          </AppView>
        </AppView>
        <AppView paddingHorizontal="base" marginTop="sm">
          {MENUS_ACTION.map(item => (
            <AppTouchableOpacity
              flexDirection="row"
              alignItems="center"
              gap="sm"
              paddingBottom="sm"
              onPress={item.onPress}>
              {item.icon}
              <AppText color="lightLink" variant="headingR3">
                {item.title}
              </AppText>
            </AppTouchableOpacity>
          ))}
        </AppView>

        <AppView
          borderTopColor="colorF0"
          flexDirection="column"
          justifyContent="center"
          borderTopWidth={1}
          flex={1}
          paddingTop="tiny">
          {!data.length ? (
            <AppNoData
              icon={
                <AppIcon
                  name={Icons.Account}
                  color={colors.color8c}
                  size={100}
                />
              }
              title="No Friend"
              desc="When you have friends, they’ll appear here."
            />
          ) : (
            <AppFlashlist
              data={[1, 2]}
              renderItem={renderItem}
              estimatedItemSize={50}
              onEndReached={() => { }}
              isRefetching={false}
              refetch={() => console.log('Refresh list contact')}
              isLoading={false}
            />
          )}
        </AppView>
      </AppView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      android: {

      },
      ios: {
        paddingVertical: responsiveHeight(12)
      }
    })
  }
})