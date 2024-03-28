import React, { memo } from 'react'
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores';
import { AppAvatar, AppIcon, AppText, AppTouchableOpacity, AppView } from '@/components';
import { Routes, navigate } from '@/navigator';
import { Icons, Theme } from '@/themes';
import { useTheme } from '@shopify/restyle';

function BlockProfileUser() {
  const { t } = useTranslation();
  const { userInfo } = useAuthStore(state => state);
  const { colors } = useTheme<Theme>()
  return (
    <AppView
      backgroundColor='white'
      paddingVertical='xs'
      paddingHorizontal='base'
      flexDirection='row'
      alignItems='center'
      gap='xs'
    >
      <AppAvatar
        avatar={userInfo?.avatar}
        width={60}
        height={60}
        borderRadius={60 / 2}
      />
      <AppView flex={1}>
        <AppView
          flexDirection="row"
          justifyContent={'space-between'}
        >
          <AppText variant={'heading3'} color={'color26'}>
            {userInfo?.fullName ?? 'User name'}
          </AppText>
          <AppTouchableOpacity onPress={() => navigate(Routes.EditProfile)}>
            <AppText variant="span" color={'lightLink'}>
              {t('Edit')}
            </AppText>
          </AppTouchableOpacity>
        </AppView>
        <AppView flexDirection="row" alignItems="center">
          <AppText variant={'rMedium'} color={'color8c'}>
            {`Referral code: ${userInfo?.referralId} `}
          </AppText>
          <AppTouchableOpacity paddingHorizontal={'tiny'}>
            <AppIcon name={Icons.Copy} size={16} color={colors.neutralGrey6} />
          </AppTouchableOpacity>
        </AppView>
      </AppView>
    </AppView >
  )
}
export default memo(BlockProfileUser)