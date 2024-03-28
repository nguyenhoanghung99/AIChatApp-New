import React from 'react';
import {ActivityIndicator, StatusBar, useColorScheme} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from '@shopify/restyle';
import {AppModalGoSetting} from '@/components/AppModal';
import BottomNavigation from '@/navigator/BottomNavigation';
import {Routes} from '@/navigator/Routes';
import {AppStackParamList} from '@/navigator/types';
import * as Screens from '@/screens';
import {useModalStore} from '@/stores';
import {theme, width} from '@/themes';
import {navigationRef} from './NavigationService';
import {useLocale} from '@/hooks';
import {AppView} from '@/components';

const Stack = createNativeStackNavigator<AppStackParamList>();
const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.HomePage}>
      <Stack.Screen name={Routes.HomePage} component={BottomNavigation} />
      <Stack.Screen name={Routes.Account} component={Screens.Account} />
      <Stack.Screen name={Routes.HelpSupport} component={Screens.HelpSupport} />
      <Stack.Screen
        name={Routes.PrivateSecurity}
        component={Screens.PrivateSecurity}
      />
      <Stack.Screen
        name={Routes.Notifications}
        component={Screens.Notifications}
      />
      <Stack.Screen name={Routes.ChangeEmail} component={Screens.ChangeEmail} />
      <Stack.Screen
        name={Routes.ChangePassword}
        component={Screens.ChangePassword}
      />
      <Stack.Screen
        name={Routes.AccountRemoved}
        component={Screens.AccountRemove}
      />
      <Stack.Screen
        name={Routes.RequestReceieved}
        component={Screens.RequestReceived}
      />
      <Stack.Screen
        name={Routes.DeleteAccount}
        component={Screens.DeleteAccount}
      />
      <Stack.Screen name={Routes.LinkAccount} component={Screens.LinkAccount} />
      <Stack.Screen name={Routes.AskAi} component={Screens.AskAi} />
      <Stack.Screen name={Routes.Contacts} component={Screens.Contacts} />
      <Stack.Screen
        name={Routes.FriendsRequest}
        component={Screens.FriendsRequest}
      />
      <Stack.Screen
        name={Routes.InviteFriends}
        component={Screens.InviteFriends}
      />
      <Stack.Screen
        name={Routes.SearchResult}
        component={Screens.SearchResult}
      />
      <Stack.Screen
        name={Routes.QrCodeProfile}
        component={Screens.QrCodeProfile}
      />
      <Stack.Screen name={Routes.QrCodeScan} component={Screens.QrCodeScan} />
      <Stack.Screen name={Routes.FriendifyAi} component={Screens.FriendifyAi} />
      <Stack.Screen name={Routes.MyCloud} component={Screens.MyCloud} />
      <Stack.Screen
        name={Routes.ChatGroupUser}
        component={Screens.ChatGroupUser}
      />
      <Stack.Screen name={Routes.ChatOneUser} component={Screens.ChatOneUser} />
      <Stack.Screen
        name={Routes.ProfileGroup}
        component={Screens.ProfileGroup}
      />
      <Stack.Screen name={Routes.ProfileUser} component={Screens.ProfileUser} />
      <Stack.Screen name={Routes.EditProfile} component={Screens.EditProfile} />
      <Stack.Screen name={Routes.DataStorage} component={Screens.DataStorage} />
      <Stack.Screen
        name={Routes.MediaManager}
        component={Screens.MediaManager}
      />
      <Stack.Screen
        name={Routes.ConversationData}
        component={Screens.ConversationData}
      />
      <Stack.Screen name={Routes.ViewMedia} component={Screens.ViewMedia} />
      <Stack.Screen name={Routes.Language} component={Screens.Language} />
      <Stack.Screen name={Routes.AboutUs} component={Screens.AboutUs} />
      <Stack.Screen
        name={Routes.FriendifyPremium}
        component={Screens.FriendifyPrenium}
      />
      <Stack.Screen name={Routes.Appearance} component={Screens.Appearance} />
      <Stack.Screen name={Routes.Guideline} component={Screens.Guideline} />
      <Stack.Screen name={Routes.Diamonds} component={Screens.Diamonds} />
    </Stack.Navigator>
  );
};
function AppNavigation() {
  const isDark = useColorScheme() === 'dark';
  const {isShowGoSetting} = useModalStore();
  const {isLoading} = useLocale();
  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <AppView flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator color={'#000000'} />
        </AppView>
      ) : (
        <BottomSheetModalProvider>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            animated
            backgroundColor={isDark ? '#000000' : '#FFFFFF'}
            translucent
          />
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {}}
            onStateChange={() => {}}>
            {isShowGoSetting && <AppModalGoSetting />}
            <Drawer.Navigator
              drawerContent={props => <Screens.Setting {...props} />}
              screenOptions={{
                headerShown: false,
                drawerPosition: 'left',
                drawerStyle: {width: width},
                swipeEnabled: false,
              }}>
              <Drawer.Screen name={'AppStack'} component={AppStack} />
            </Drawer.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      )}
    </ThemeProvider>
  );
}
export default AppNavigation;
