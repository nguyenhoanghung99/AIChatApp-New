import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native-gesture-handler';
import { useTheme } from '@shopify/restyle';

import { AppBackHeader, AppButtonV2, AppIcon, AppText, AppView } from '@/components';
import { MenuSocial } from '@/utilities';
import { FontSizes, Theme, responsiveWidth, width } from '@/themes';


const LinkAccount = () => {
  const { t } = useTranslation();
  const {colors} = useTheme<Theme>();
  return (
    <AppBackHeader title='Link Account'>
      <AppView backgroundColor='white'
        margin='base'
        borderRadius='xxs'
      >
        {MenuSocial.map((social, index) => {
          return (
            <Fragment key={index}>
              <AppView
                paddingVertical="xs"
                paddingHorizontal="base"
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between">
                <AppView flexDirection="row" alignItems="center" gap="xs">
                  <AppView
                    width={32}
                    height={32}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius='xxs'
                    backgroundColor='neutralGrey5'
                  >
                    <AppIcon name={social.icon} size={FontSizes.large} color={colors.black} />
                  </AppView>
                  <AppText color="neutralGrey9">{social.socialName}</AppText>
                </AppView>
                <Switch onValueChange={() => { }} value={false} />
              </AppView>
              {index !== MenuSocial.length - 1 && <AppView>
                <AppView width={width - responsiveWidth(90)} height={1} backgroundColor='neutralGrey3' alignSelf='flex-end' />
              </AppView>}
            </Fragment>
          );
        })}
      </AppView>
      <AppView margin='base'>
        <AppButtonV2
          label='Update'
          onPress={() => { }}
        />
      </AppView>
    </AppBackHeader>
  );
};

export default LinkAccount;
