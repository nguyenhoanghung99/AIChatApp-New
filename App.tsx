/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import {BaseStyles} from './src/themes';
import AppNavigation from './src/navigator/AppNavigation';
import ModeThemeProvider from './src/contexts/ModeThemeContext';
import {
  useConfigGoogle,
  useDeepLinksQrCode,
  useSetupReceviceNotification,
} from './src/hooks';
import './src/translations';
const queryClient = new QueryClient();
function App(): React.JSX.Element {
  useConfigGoogle();
  useSetupReceviceNotification();
  useDeepLinksQrCode();
  return (
    <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
      <GestureHandlerRootView style={BaseStyles.flex1}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <ModeThemeProvider>
              <AppNavigation />
            </ModeThemeProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </KeyboardProvider>
  );
}
export default App;
