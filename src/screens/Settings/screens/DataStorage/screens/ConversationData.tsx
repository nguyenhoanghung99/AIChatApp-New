import React, { useState } from 'react';
import { AppButton, AppIcon, AppSafeAreaView, AppText, AppView } from '@/components';
import { ScreenHeader } from '@/screens/Settings/components';
import { Icons, theme } from '@/themes';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import { CONVERSATION_DATA } from '../../const';
import { Routes, navigate } from '@/navigator';

const ConversationData = () => {
    const { t } = useTranslation();
    const [isOption, setShowOption] = useState<boolean>(false);
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
        const newArr = CONVERSATION_DATA.map((item, index) => index + 1);
        setChoosenList(newArr);
    }

    const _renderItem = ({ item, index }: { item: { name: string, size: string }, index: number }) => {
        const exist = lstChoosen.find(x => x == (index + 1));
        return (
            <AppButton
                onLongPress={() => setShowOption(pre => pre = true)}
                onPress={() => navigate(Routes.MediaManager)}
                marginHorizontal='base'
                paddingHorizontal='base'
                key={`ConversationData${index}`}
                flexDirection='row'
                justifyContent={'space-between'}
                gap='base'
                alignItems='center'
                bg={'white'}
                borderTopLeftRadius={index == 0 ? 'sm' : 'reset'}
                borderTopRightRadius={index == 0 ? 'sm' : 'reset'}
                borderBottomRightRadius={index == CONVERSATION_DATA.length - 1 ? 'sm' : 'reset'}
                borderBottomLeftRadius={index == CONVERSATION_DATA.length - 1 ? 'sm' : 'reset'}
            >
                {
                    isOption &&
                    <AppButton
                        width={theme.spacing.md}
                        height={theme.spacing.md}
                        borderWidth={1}
                        borderRadius={'massive'}
                        borderColor={exist ? 'lightLink' : 'color72'}
                        backgroundColor={exist ? 'lightLink' : 'bgBlack'}
                        onPress={() => _handleChoosenItem(index + 1)}
                        justifyContent='center'
                        alignItems='center'
                    >
                        {exist && <AppIcon name={Icons.Check} size={theme.spacing.xxs} color={'white'} />}
                    </AppButton>
                }
                <AppView width={32} height={32} borderRadius={'massive'} backgroundColor={'lightLink'} />
                <AppView flex={1} borderBottomWidth={1} borderBottomColor={'border'} flexDirection='row' justifyContent='space-between' paddingVertical='base'>
                    <AppText color={'color26'} variant={'headingR3'}>{item.name}</AppText>
                    <AppView flexDirection='row' gap={'xs'} alignItems='center'>
                        <AppText color={'color8c'} variant={'heading3'}>{item.size}</AppText>
                        <AppIcon name={Icons.ChevronRight} color={theme.colors.color8c} />
                    </AppView>
                </AppView>
            </AppButton>
        );
    }

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
        <AppSafeAreaView backgroundColor="colorF5" flex={1}>
            <ScreenHeader title={t('Conversation data')} />
            <FlashList
                data={CONVERSATION_DATA}
                renderItem={_renderItem}
                estimatedItemSize={70}
                contentContainerStyle={{
                    paddingVertical: theme.spacing.base
                }}
                extraData={[isOption, lstChoosen]}
            />
            {isOption && _renderBottom()}
        </AppSafeAreaView>
    );
};

export default ConversationData;