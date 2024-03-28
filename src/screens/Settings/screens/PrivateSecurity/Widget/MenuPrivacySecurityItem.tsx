import React from 'react';
import {useTranslation} from 'react-i18next';

import {AppIcon, AppText, AppView} from '@/components';
import AppButton from '@/components/AppButton/AppButton';

import {FontSizes, Icons} from '@/themes';

const MenuPrivacySecurityItem = ({
  item,
  isShowBorder,
  onPress,
  optionalRightItem,
}: {
  item: {
    id: number;
    title: string;
    icon: React.ReactNode;
    subTitle?: string;
  };
  onPress: () => void;
  isShowBorder?: boolean;
  optionalRightItem?: React.ReactNode;
}) => {
  const {t} = useTranslation();
  return (
    <AppButton
      onPress={onPress}
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      paddingVertical="xxs"
      paddingHorizontal="base"
      borderBottomColor="greyMenu"
      borderBottomWidth={isShowBorder ? 0.5 : 0}>
      <AppView flexDirection="row" alignItems="center">
        <AppView
          width={50}
          height={50}
          alignItems="center"
          justifyContent="center">
          {item.icon}
        </AppView>
        <AppText color="black">{t(item.title)}</AppText>
      </AppView>
      {optionalRightItem ? (
        <>{optionalRightItem}</>
      ) : (
        <AppView flexDirection="row" alignItems="center" gap="xxs">
          {item.subTitle && (
            <AppText fontSize={FontSizes.body}>{t(item.subTitle)}</AppText>
          )}
          <AppIcon name={Icons.ChevronRight} size={16} />
        </AppView>
      )}
    </AppButton>
  );
};

export default MenuPrivacySecurityItem;
