import { AppIcon, AppSafeAreaView, AppScrollView } from '@/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from '../../components';
import { Icons } from '@/themes';
import { PieChart, CachedData, MediaLarge, Conversation } from './widget';
import AppAskModal from '@/components/AppModal/AppAskModal';

export default function DataStorage() {
  const { t } = useTranslation();
  const [isShowModalConfirm, setShowModalConfirm] = useState(false);
  const ArrBtn = [
    {
      title: t('Cancel'),
      textColor: 'neutralGrey9',
      onPress: () => setShowModalConfirm(false),
    },
    {
      title: t('Clean'),
      textColor: 'white',
      btnColor: 'neutralGrey9',
      onPress: () => _handleCleanCache(),
    },
  ];

  const _handleCleanCache = () => {
    setShowModalConfirm(false);
  }

  return (
    <AppSafeAreaView backgroundColor="colorF5">
      <ScreenHeader title={t('Data & Storage')} />
      <AppScrollView contentContainerStyle={{
        paddingBottom: 100
      }}>
        <PieChart />
        <CachedData onPress={() => setShowModalConfirm(true)} />
        <MediaLarge />
        <Conversation />
        {isShowModalConfirm && (
          <AppAskModal
            animationType="fade"
            title={t('Clear cache')}
            message={t(
              'Clear 392,5 MB of files from your storage',
            )}
            arrBtn={ArrBtn}
          />
        )}
      </AppScrollView>
    </AppSafeAreaView>

  )
}
