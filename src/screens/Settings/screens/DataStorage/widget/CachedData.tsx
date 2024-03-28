import { AppButton, AppText, AppView } from '@/components'
import { fonts } from '@/themes';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function CachedData({
    onPress,
}: {
    onPress: () => void
}) {
    const { t } = useTranslation();
    return (
        <AppView
            backgroundColor={'bgBlack'}
            marginHorizontal='base'
            padding='base'
            borderRadius='base'
            gap='base'
        >
            <AppView alignItems='center' flexDirection='row' gap='base'>
                <AppText color={'color72'} variant={'heading3'}>{t('Cached data')}</AppText>
                <AppView width={10} height={10} borderRadius={'massive'} backgroundColor={'colorBF'} />
                <AppText color={'color72'} variant={'rMedium'}>{'43.5 GB'}</AppText>
            </AppView>
            <AppText color={'color72'} variant={'rMedium'}>{`Temporary data generated when using Friendify. Clearing it won't affect your conversations.`}</AppText>
            <AppButton onPress={onPress} backgroundColor={'black'} paddingHorizontal='base' paddingVertical='xs' alignSelf='flex-start' borderRadius='xxs'>
                <AppText color={'bgBlack'} variant={'sMedium'}>{t('Clear cache')}</AppText>
            </AppButton>
        </AppView>

    )
}
