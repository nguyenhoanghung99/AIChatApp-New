import {AppSafeAreaView, AppText} from '@/components';
import React from 'react';

export default function Playground() {
  return (
    <AppSafeAreaView backgroundColor="bgBlack" flex={1}>
      <AppText variant="heading1" color="black">
        Playground
      </AppText>
    </AppSafeAreaView>
  );
}
