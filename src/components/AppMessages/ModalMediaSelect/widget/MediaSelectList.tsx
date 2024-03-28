import { AppButton, AppFastImage, AppIcon, AppRadio, AppText, AppView, LoadingComponent } from '@/components';
import { FontSizes, Icons, theme } from '@/themes';
import React, { memo, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { MediaDTO, useAccessFile, useGallery, useMutationMessageActions } from '@/hooks';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { EMediaType, TYPE_MESSAGE } from '@/constants';
import uuid from 'react-native-uuid';

const MediaSelectList = memo(({ onShowAddCaption, onCloseAddCaption, roomId }: {
    onShowAddCaption: () => void;
    onCloseAddCaption: () => void;
    roomId: string
}) => {
    const [lstChoosen, setChoosenList] = useState<Number[]>([]);
    const { handleAccessFile } = useAccessFile();
    const { onMessageActionSendMedia, setDataMessageLocal } = useMutationMessageActions();
    const { photos, isLoading, isLoadingNextPage, nextCursor, hasNextPage, loadNextPageMedia } = useGallery();
    const _handleChoosenItem = (item: MediaDTO, id: number) => {
        const newArr = [...lstChoosen];
        const exist = newArr.findIndex(x => x == id);
        if (exist !== -1) {
            newArr.splice(exist, 1)
        } else {
            newArr.push(id);
        }
        if (newArr.length) {
            onShowAddCaption?.();
        } else {
            onCloseAddCaption?.();
        }
        handleAccessFile(item);
        setChoosenList(newArr);
    }

    const _onLoadMore = () => {
        if (!isLoadingNextPage && hasNextPage) {
            loadNextPageMedia(nextCursor);
        }
    }

    const _openCamera = () => {
        ImagePicker.openCamera({}).then(_handleSendFile)
    };

    const _handleSendFile = (image: ImageOrVideo) => {
        try {
            onCloseAddCaption();
            const formData = new FormData();
            formData.append('type', TYPE_MESSAGE.MEDIA);
            formData.append('media', {
                uri: image.path,
                name: image.path.split('/').pop(),
                type: image.mime,
            });
            const typeMessage = image.mime.includes('video') ? EMediaType.VIDEO : EMediaType.IMAGE;
            const _content = {
                data: { url: image.path, type: typeMessage, },
                caption: '',
            };
            const form = {
                content: JSON.stringify(_content),
                subType: TYPE_MESSAGE.MEDIA,
                replySender: null,
                idMessage: uuid.v4() as string,
                roomId,
                tag: [],
                caption: '',
            } as TSendMessageSocket;
            setDataMessageLocal(form, roomId);
            onMessageActionSendMedia(formData, form);
        } catch (error) {
        }

    };

    const _renderItems = ({ item, index }: { item: MediaDTO, index: number }) => {
        const exist = lstChoosen.find(x => x == (index + 1));
        return (
            <AppButton
                height={118}
                width={'33.3%'}
                key={`MediaSelectList${index}`}
                alignSelf={'flex-start'}
                backgroundColor={'white'}
                onPress={() => index === 0 ? _openCamera() : _handleChoosenItem(item, index + 1)}
            >
                {
                    item.uri ?
                        <AppFastImage source={{ uri: item.uri ?? '' }} style={{
                            width: '100%',
                            height: '100%'
                        }} />
                        :
                        null
                }
                {index === 0 ? <AppView flex={1} justifyContent='center' alignItems='center'>
                    <AppIcon name={Icons.Camera} size={FontSizes.heading5} color={'black'} />
                </AppView>
                    :
                    <>
                        <AppView position={'absolute'} right={0} padding={'xxs'}>
                            <AppRadio onPress={() => _handleChoosenItem(item, index + 1)} value={exist ? true : false} title={''} />
                        </AppView>
                        <AppView position={'absolute'} right={0} paddingHorizontal={'xxs'} paddingVertical={'tiny'} backgroundColor={'backdrop'} bottom={0} borderTopLeftRadius={'sm'}>
                            <AppText variant={'tiny'} color='white' textTransform={'uppercase'} >{item.type?.split('/').pop()}</AppText>
                        </AppView>
                    </>

                }
            </AppButton>
        );
    };

    const data = useMemo(() => {
        const res = [{
            filename: '',
            fileSize: 0,
            uri: '',
            type: ''
        },
        ...photos ?? []];
        return res;
    }, [photos]);

    return (
        <>
            {
                isLoading ?
                    <LoadingComponent />
                    :
                    <FlatList
                        data={data ?? []}
                        horizontal={false}
                        numColumns={3}
                        columnWrapperStyle={{
                            gap: 2,
                        }}
                        ItemSeparatorComponent={() => <AppView height={2} />}
                        contentContainerStyle={{
                            paddingHorizontal: theme.spacing.base
                        }}
                        renderItem={_renderItems}
                        onEndReachedThreshold={0.7}
                        ListFooterComponent={isLoadingNextPage ? <LoadingComponent /> : null}
                        onEndReached={_onLoadMore}
                        extraData={data}
                    />
            }
        </>

    )
})
export default MediaSelectList;
