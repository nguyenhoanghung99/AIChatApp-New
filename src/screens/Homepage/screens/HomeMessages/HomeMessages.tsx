import React, {useEffect, useRef} from 'react';
import {AppHomeHeader, AppSafeAreaView, AppModalAuthen} from '@/components';
import {
  FloatAccessibility,
  ListChannelMessages,
  SubHeaderMessage,
} from '@/screens';
import {useSocket} from '@/hooks';

export default function HomeMessages() {
  const modalRef = useRef<TModalRef>(null);
  const {onConnect} = useSocket();

  useEffect(() => {
    onConnect(() => {});
  }, [onConnect]);
  return (
    <AppSafeAreaView backgroundColor="bgBlack" flex={1} edges={['top']}>
      <AppHomeHeader />
      <SubHeaderMessage />
      <ListChannelMessages />
      <FloatAccessibility onPress={() => modalRef.current?.onShow()} />
      <AppModalAuthen ref={modalRef} />
    </AppSafeAreaView>
  );
}
