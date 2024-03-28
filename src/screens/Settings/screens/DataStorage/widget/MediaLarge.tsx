
import { SVGMedia } from '@/assets/svg/media';
import { AppButton, AppText, AppView } from '@/components'
import { fonts } from '@/themes';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { MEDIA } from '../../const';
import { Routes, navigate } from '@/navigator';

export default function MediaLarge() {
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
                <AppText color={'color72'} variant='heading3'>{t('Media larger than 5MB')}</AppText>
                <AppView width={10} height={10} borderRadius={'massive'} backgroundColor={'colorBF'} />
                <AppText color={'color72'} variant={'rMedium'}>{'43.5 GB'}</AppText>
            </AppView>
            <AppView flexDirection='row' justifyContent='space-between'>
                {
                    MEDIA.map((item, index) => {
                        return (
                            <AppView key={`MEDIA${index}`} alignItems='center' gap='base'>
                                <item.icon />
                                <AppText color={'color72'} variant={'rSmall'} >{item.name}</AppText>
                            </AppView>
                        );
                    })
                }
            </AppView>
            <AppButton
                onPress={() => navigate(Routes.MediaManager)}
                backgroundColor={'black'} paddingHorizontal='base' paddingVertical='xs' alignSelf='flex-start' borderRadius='xxs'>
                <AppText color={'bgBlack'} variant={'sMedium'} >{t('View and Clean Up')}</AppText>
            </AppButton>
        </AppView>

    )
}
