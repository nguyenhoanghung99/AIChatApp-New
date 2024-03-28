import React, { useState } from 'react';
import { AppButton, AppIcon, AppText, AppView } from '@/components';
import { Icons, theme } from '@/themes';
import { useTranslation } from 'react-i18next';
import { MEDIA_LIST } from '../../../const';
import { FlatList } from 'react-native';

const MediaList = () => {
    const { t } = useTranslation();
    const [lstChoosen, setChoosenList] = useState<Number[]>([]);

    const _handleChoosenItem = (id: number) => {
        const newArr = [...lstChoosen];
        const exist = newArr.findIndex(x => x == id);
        if (exist !== -1) {
            newArr.splice(exist, 1)
        } else {
            newArr.push(id);
        }
        setChoosenList(newArr);
    }

    const _handleSelectAll = () => {
        const newArr = MEDIA_LIST.map((item, index) => index + 1);
        setChoosenList(newArr);
    }

    const _renderItem = ({ item, index }: {
        item: {
            name: string,
            icon: any,
            size: string
        },
        index: number
    }) => {
        const exist = lstChoosen.find(x => x == (index + 1));
        return (
            <AppButton
                key={`MediaList${index}`}
                gap={'tiny'}
                backgroundColor={'white'}
                padding={'xs'}
                borderRadius={'xxs'}
                width={'33%'}
                onPress={() => _handleChoosenItem(index + 1)}
            >
                <item.icon />

                <AppText color='color26' variant={'span'}>{item.name}</AppText>
                <AppText color={'color26'} variant={'sMedium'}>{item.size}</AppText>
                {
                    <AppView
                        width={theme.spacing.md}
                        height={theme.spacing.md}
                        borderWidth={1}
                        borderRadius={'massive'}
                        borderColor={exist ? 'lightLink' : 'color72'}
                        backgroundColor={exist ? 'lightLink' : 'bgBlack'}
                        position={'absolute'}
                        justifyContent='center'
                        alignItems='center'
                        right={theme.spacing.base}
                        top={theme.spacing.base}
                    >
                        {exist && <AppIcon name={Icons.Check} size={theme.spacing.xxs} color={'white'} />}
                    </AppView>
                }
            </AppButton>
        );
    };

    const _renderBottom = () => {
        return (
            <AppView flexDirection='row' justifyContent={'center'} alignItems='center' padding={'md'} backgroundColor={'bgBlack'}>
                <AppButton
                    position={'absolute'}
                    left={theme.spacing.md}
                    onPress={_handleSelectAll}>
                    <AppText color={'lightLink'} variant={'headingR3'}>{t('Select All')}</AppText>
                </AppButton>
                <AppText color={'black'} variant={'heading3'}>{lstChoosen.length ? lstChoosen.length : ''}</AppText>
                <AppButton
                    position={'absolute'}
                    right={0}
                    padding={'md'}
                >
                    <AppIcon name={Icons.Delete} size={24} color={'black'} />
                </AppButton>
            </AppView>
        )
    };

    return (
        <>
            <FlatList
                data={MEDIA_LIST}
                horizontal={false}
                renderItem={_renderItem}
                numColumns={3}
                contentContainerStyle={{
                    padding: theme.spacing.base,
                    gap: theme.spacing.xxs,
                }}
                columnWrapperStyle={{
                    gap: theme.spacing.xxs,
                }}
            />
            {_renderBottom()}
        </>
    );
};

export default MediaList;