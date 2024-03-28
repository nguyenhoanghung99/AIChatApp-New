import { AppButton, AppText, AppView } from '@/components'
import { Routes, navigate } from '@/navigator';
import { fonts } from '@/themes';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Conversation() {
    const { t } = useTranslation();
    return (
        <AppView
            backgroundColor={'bgBlack'}
            marginHorizontal='base'
            padding='base'
            borderRadius='base'
            gap='base'
            marginTop='xl'
        >
            <AppView alignItems='center' flexDirection='row' gap='base'>
                <AppText color={'color72'} variant={'heading3'}>{t('Conversation data')}</AppText>
                <AppView width={10} height={10} borderRadius={'massive'} backgroundColor={'colorBF'} />
                <AppText color={'color72'} variant={'rMedium'}>{'43.5 GB'}</AppText>
            </AppView>
            <AppText color={'color72'} variant={'rMedium'}>{`All your text messages, photos, videos, voice messages and files within Friendify`}</AppText>
            <AppButton
                onPress={() => navigate(Routes.ConversationData)}
                backgroundColor={'black'} paddingHorizontal='base' paddingVertical='xs' alignSelf='flex-start' borderRadius='xxs'>
                <AppText color={'bgBlack'} variant={'sMedium'}>{t('View and Clean Up')}</AppText>
            </AppButton>
        </AppView>

    )
}
