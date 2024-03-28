import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {AppIcon, AppText, AppTouchableOpacity, AppView} from '@/components';
import {FontSizes, Icons, Theme, isIOS} from '@/themes';
import {useTheme} from '@shopify/restyle';
import { AuthenService } from '@/services';

export default function AppHomeHeader() {
  const navigation = useNavigation();
  const {colors} = useTheme<Theme>();
  return (
    <AppView
      paddingHorizontal="base"
      flexDirection="row"
      paddingBottom="md"
      alignItems="center"
      marginTop={isIOS ? 'reset' : 'xs'}
      >
      <AppTouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <AppIcon
          name={Icons.Hamburger}
          size={FontSizes.large}
          color={colors.black}
        />
      </AppTouchableOpacity>
      <AppTouchableOpacity
        flexDirection="row"
        flex={1}
        alignItems="center"
        justifyContent="center"
        marginLeft="xl"
        gap="xxs">
        <AppIcon
          name={Icons.Diamond}
          size={FontSizes.title}
          color={colors.black}
        />
        <AppText variant="heading2" color={'black'}>
          1.234M
        </AppText>
      </AppTouchableOpacity>
      <AppView flexDirection="row" gap="xxs">
        <AppTouchableOpacity onPress={() => {}}>
          <AppIcon
            name={Icons.Gift}
            size={FontSizes.xlarge}
            color={colors.black}
          />
        </AppTouchableOpacity>
        <AppTouchableOpacity onPress={() => {}}>
          <AppIcon
            name={Icons.Noti}
            size={FontSizes.xlarge}
            color={colors.black}
          />
        </AppTouchableOpacity>
      </AppView>
    </AppView>
  );
}
