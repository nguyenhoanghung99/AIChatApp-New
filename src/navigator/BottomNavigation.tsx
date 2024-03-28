import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { AppIcon, AppText, AppTouchableOpacity, AppView } from '@/components';
import { Routes } from '@/navigator/Routes';
import * as Screens from '@/screens';
import { Icons, Theme, isIOS, responsiveHeight } from '@/themes';

const Tab = createBottomTabNavigator();
type TTabbarProps = {
  route: string;
  icon: string;
} & BottomTabBarButtonProps;
const TabbarItem = ({
  onPress,
  accessibilityState,
  route,
  icon,
}: TTabbarProps) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();

  const focused = useMemo(
    () => Boolean(accessibilityState?.selected),
    [accessibilityState?.selected],
  );
  return (
    <AppTouchableOpacity
      onPress={onPress}
      flex={1}
      marginTop="sm"
    >
      <AppView justifyContent="center" alignItems="center">
        <AppIcon
          name={icon}
          size={22}
          color={focused ? theme.colors.marengo : theme.colors.greyMenu}
        />
        <AppText
          marginTop="tiny"
          variant={'small'}
          color={focused ? 'marengo' : 'greyMenu'}>
          {t(route)}
        </AppText>
      </AppView>
    </AppTouchableOpacity>
  );
};
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: isIOS ? responsiveHeight(88) : responsiveHeight(120),
        },
      }}>
      <Tab.Screen
        name={Routes.HomeMessages}
        component={Screens.HomeMessages}
        options={{
          tabBarButton: (props: BottomTabBarButtonProps) => {
            return (
              <TabbarItem {...props} route="Messages" icon={Icons.Messager} />
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.AskAi}
        component={Screens.AskAi}
        options={{
          tabBarButton: (props: BottomTabBarButtonProps) => {
            return <TabbarItem {...props} route="Ask AI" icon={Icons.AskAi} />;
          },
        }}
      />
      <Tab.Screen
        name={Routes.Playground}
        component={Screens.Playground}
        options={{
          tabBarButton: (props: BottomTabBarButtonProps) => {
            return (
              <TabbarItem
                {...props}
                route="Playground"
                icon={Icons.Playground}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigation;
