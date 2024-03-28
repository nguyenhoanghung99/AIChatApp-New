import React, { useEffect, useState } from 'react';

import { AppSafeAreaView, AppText, AppView } from '@/components';
import { ActivityIndicator, Switch } from 'react-native';
import { useService, useThemeContext } from '@/hooks';
import { Geolocation } from '@/utilities';
import { GeolocationState, GeolocationStatus } from '@/utilities/geolocation';

const ContactList = () => {
  return (
    <AppSafeAreaView backgroundColor="bgBlack" flex={1}>
        <AppView>
            <AppText>{'Contact'}</AppText>
        </AppView>
    </AppSafeAreaView>
  );
}

export default ContactList;