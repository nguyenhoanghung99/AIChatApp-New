import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { AppBackHeader, AppButton, AppIcon, AppText, AppView } from '@/components';
import { navigate } from '@/navigator/NavigationService';
import { Routes } from '@/navigator';
import { FontSizes, Icons, Theme, responsiveWidth, width } from '@/themes';

const Account = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<Theme>();
  const accounts = useMemo(() => {
    return [
      {
        id: 2,
        title: 'Password',
        routeName: Routes.ChangePassword,
        icon: Icons.Password,
        backgroundColor: colors.lightLink
      },
      {
        id: 3,
        title: 'Link Account',
        routeName: Routes.LinkAccount,
        icon: Icons.LinkAccount,
        backgroundColor: colors.success
      },
      {
        id: 4,
        title: 'Delete Account',
        routeName: Routes.DeleteAccount,
        icon: Icons.DeleteAccount,
        backgroundColor: colors.pink
      },
    ]
  }, [])
  return (
    <AppBackHeader title={'Account'}>
      <AppView backgroundColor="white" borderRadius="sm"
        margin='base'
      >
        {
          accounts.map((item, index) => {
            return (
              <>
                <AppButton
                  key={item.id}
                  onPress={() => navigate(item.routeName)}
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection="row"
                  paddingVertical="xs"
                  paddingHorizontal="base"
                  borderBottomColor="greyMenu"
                >
                  <AppView flexDirection="row" alignItems="center" gap='xs'>
                    <AppView
                      width={32}
                      height={32}
                      alignItems="center"
                      justifyContent="center"
                      style={{ backgroundColor: item.backgroundColor }}
                      borderRadius='xxs'
                    >
                      <AppIcon name={item.icon} size={FontSizes.large} color={colors.white} />
                    </AppView>
                    <AppText color="black" variant='heading3' fontWeight='400'>{t(item.title)}</AppText>
                  </AppView>
                  <AppView flexDirection="row" alignItems="center" gap="xxs">
                    <AppIcon name={Icons.ChevronRight} size={16} color={colors.neutralGrey6} />
                  </AppView>
                </AppButton>
                {index !== accounts.length - 1 && <AppView>
                  <AppView width={width - responsiveWidth(90)} height={1} backgroundColor='neutralGrey3' alignSelf='flex-end' />
                </AppView>}
              </>
            )
          })
        }
      </AppView>
    </AppBackHeader>
  );
};

export default Account;
