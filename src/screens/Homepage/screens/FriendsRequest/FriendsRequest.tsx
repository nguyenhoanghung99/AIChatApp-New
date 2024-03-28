import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  AppAvatar,
  AppButton,
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
import {FontSizes, Icons, Theme, width} from '@/themes';
import {useTheme} from '@shopify/restyle';
import {useTranslation} from 'react-i18next';
import {Swipeable} from 'react-native-gesture-handler';
import {goBack} from '@/navigator';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';

export default function FriendsRequest() {
  const {colors} = useTheme<Theme>();
  const {t} = useTranslation();
  const swipeContactRef = useRef<Swipeable | null>(null);
  const [data, setData] = useState([]);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes = [
    {key: 'Received', title: 'Received'},
    {key: 'Sent', title: 'Sent'},
  ];

  const renderItem = useCallback(({item}: {item: any}) => {
    return (
      <AppPressable
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
            avatar="https://www.vietnamfineart.com.vn/wp-content/uploads/2023/07/anh-gai-xinh-vn-3.jpg"
          />
          <AppView flex={1}>
            <AppText color="black" variant="sMedium" numberOfLines={1}>
              Người yêu của em rất xinh đẹp
            </AppText>
          </AppView>
        </AppView>
        <AppView flexDirection="row" alignItems="center" gap="tiny">
          <AppTouchableOpacity
            backgroundColor="colorBF"
            paddingHorizontal="sm"
            height={32}
            alignItems="center"
            justifyContent="center"
            borderRadius="sm">
            <AppText color="white" variant="spanSemibold">
              {t('Remove')}
            </AppText>
          </AppTouchableOpacity>
          <AppTouchableOpacity
            backgroundColor="color37"
            paddingHorizontal="sm"
            height={32}
            alignItems="center"
            justifyContent="center"
            borderRadius="sm">
            <AppText color="white" variant="spanSemibold">
              {t('Accept')}
            </AppText>
          </AppTouchableOpacity>
        </AppView>
      </AppPressable>
    );
  }, []);

  const renderItemSent = useCallback(({item}: {item: any}) => {
    return (
      <AppPressable
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
            avatar="https://www.vietnamfineart.com.vn/wp-content/uploads/2023/07/anh-gai-xinh-vn-3.jpg"
          />
          <AppView flex={1}>
            <AppText color="black" variant="sMedium" numberOfLines={1}>
              Người yêu của em rất xinh đẹp
            </AppText>
          </AppView>
        </AppView>
        <AppView flexDirection="row" alignItems="center" gap="tiny">
          <AppTouchableOpacity
            backgroundColor="colorBF"
            paddingHorizontal="sm"
            height={32}
            alignItems="center"
            justifyContent="center"
            borderRadius="sm">
            <AppText color="white" variant="spanSemibold">
              {t('Recall')}
            </AppText>
          </AppTouchableOpacity>
        </AppView>
      </AppPressable>
    );
  }, []);

  const dataReceived = [];
  const dataSent = [];

  const RenderRouteReceived = useCallback(
    () => (
      <AppView
        flex={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        {!dataReceived.length ? (
          <AppNoData
            icon={
              <AppIcon name={Icons.Account} color={colors.color8c} size={100} />
            }
            title="No Friend"
            desc="When you have friends, they’ll appear here."
          />
        ) : (
          <AppFlashlist
            data={[1, 2, 3, 4, 5, 1, 2, 3, 4, 5]}
            renderItem={renderItem}
            scrollEnabled
            estimatedItemSize={50}
            onEndReached={() => {}}
            isRefetching={false}
            refetch={() => console.log('Refresh list contact')}
            isLoading={false}
          />
        )}
      </AppView>
    ),
    [],
  );

  const RenderRouteSent = useCallback(
    () => (
      <AppView
        flex={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        {!dataSent.length ? (
          <AppNoData
            icon={
              <AppIcon name={Icons.Account} color={colors.color8c} size={100} />
            }
            title="No Friend"
            desc="When you have friends, they’ll appear here."
          />
        ) : (
          <AppFlashlist
            data={[1, 2, 3, 4, 5, 1, 2, 3, 4, 5]}
            renderItem={renderItemSent}
            scrollEnabled
            estimatedItemSize={50}
            onEndReached={() => {}}
            isRefetching={false}
            refetch={() => console.log('Refresh list contact')}
            isLoading={false}
          />
        )}
      </AppView>
    ),
    [],
  );

  const renderScene = SceneMap({
    Received: RenderRouteReceived,
    Sent: RenderRouteSent,
  });

  const _renderItemTab = () => {
    return (
      <AppView
        flexDirection="row"
        paddingVertical={'xxs'}
        justifyContent="center"
        alignItems="center">
        {routes.map((el, i) => {
          return (
            <AppView flex={1}>
              <AppButton
                key={`MediaManager${i}`}
                paddingVertical={'tiny'}
                borderBottomWidth={i == index ? 1 : 0}
                borderBottomColor="color26"
                onPress={() => setIndex(i)}>
                <AppView>
                  <AppText
                    textAlign="center"
                    variant="sMedium"
                    color={i == index ? 'black' : 'color72'}>
                    {el.title}
                  </AppText>
                  {i === 0 && (
                    <AppView
                      borderRadius="massive"
                      position="absolute"
                      height={16}
                      width={16}
                      top={0}
                      right="20%"
                      backgroundColor="red"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center">
                      <AppText color="white" variant="tiny">
                        25
                      </AppText>
                    </AppView>
                  )}
                </AppView>
              </AppButton>
            </AppView>
          );
        })}
      </AppView>
    );
  };

  return (
    <AppSafeAreaView flex={1} style={{backgroundColor: 'white'}}>
      <AppView backgroundColor="white" flex={1}>
        <AppView
          paddingHorizontal="base"
          flexDirection="row"
          alignItems="center"
          paddingBottom="base">
          <AppTouchableOpacity
            hitSlop={{top: 40, left: 40, bottom: 40, right: 40}}
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
              {t('Friends Request')}
            </AppText>
          </AppView>
        </AppView>

        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          swipeEnabled
          renderTabBar={_renderItemTab}
          initialLayout={{width: layout.width}}
        />
      </AppView>
    </AppSafeAreaView>
  );
}
