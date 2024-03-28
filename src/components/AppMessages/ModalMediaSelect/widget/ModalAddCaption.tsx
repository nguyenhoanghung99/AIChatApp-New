import { AppButton, AppView } from '@/components';
import React, {
    Ref,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, TextInput } from 'react-native';
import AppBottomSheet from '@/components/AppBottomSheet/AppBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { FontSizes, theme } from '@/themes';
import { SendIcon } from '@/assets/svg';
import { MediaDTO, useMutationMessageActions } from '@/hooks';
import { EventEmitter } from '@/utilities';
import { EMediaType, TYPE_MESSAGE } from '@/constants';
import uuid from 'react-native-uuid';

export const uploadFileEventEmitter = new EventEmitter<'uploadFile', MediaDTO[]>();

const TYPE = [TYPE_MESSAGE.MEDIA, TYPE_MESSAGE.FILE, TYPE_MESSAGE.GIFT, TYPE_MESSAGE.CONTACT, TYPE_MESSAGE.LOCATION]
type TProps = {
    onCloseAddCaption: () => void;
    roomId: string;
    index: number;
};

function ModalAddCaption({ onCloseAddCaption, roomId, index }: TProps, ref: Ref<TModalRef>) {
    const { t } = useTranslation();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { onMessageActionSendMedia, setDataMessageLocal } = useMutationMessageActions();
    const snapPoints = useMemo(() => [1, 70], []);
    const refFiles = useRef<MediaDTO[]>([]);
    const refCaption = useRef('');

    useEffect(() => {
        uploadFileEventEmitter.subscribe('uploadFile', _handleEvent);
        return () => {
            uploadFileEventEmitter.unsubscribe('uploadFile', _handleEvent);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        onClose,
        onShow,
    }));

    const onClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const onShow = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(1);
    }, []);

    const _handleEvent = (res: MediaDTO[]) => {
        refFiles.current = res;
    }

    const _onChangeCaption = (res: string) => {
        refCaption.current = res;
    }

    const _handleSendFile = () => {
        try {
            Keyboard.dismiss;
            onClose();
            setTimeout(() => {
                onCloseAddCaption();
            }, 200);
            const formData = new FormData();
            formData.append('type', TYPE[index]);
            refFiles.current.forEach(item => {
                formData.append('media', {
                    uri: item.uri,
                    name: item.filename,
                    type: item.type,
                });
            });
            const _content = {
                data: refFiles.current.map((rs) => ({
                    url: rs.uri,
                    type: TYPE[index] === TYPE_MESSAGE.MEDIA ? rs.type.includes('video') ? EMediaType.VIDEO : EMediaType.IMAGE : TYPE[index]
                })),
                caption: refCaption.current,
            };
            const form = {
                content: JSON.stringify(_content),
                subType: TYPE[index],
                replySender: null,
                idMessage: uuid.v4() as string,
                roomId,
                tag: [],
                caption: refCaption.current,
            } as TSendMessageSocket;
            setDataMessageLocal(form, roomId);
            onMessageActionSendMedia(formData, form);
        } catch (error) {
        }

    };

    return (
        <AppBottomSheet
            bottomSheetRef={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            handleIndicatorStyle={{ height: 0 }}
            borderTopWidth={1}
            borderTopColor='border'
            paddingTop='minusSmall'
            animateOnMount={true}>
            <AppView
                backgroundColor='border'
                flexDirection='row'
                marginHorizontal='base'
                borderRadius='md'
                alignItems='center'
                paddingVertical='tiny'
            >
                <TextInput
                    onChangeText={_onChangeCaption}
                    style={{
                        fontSize: FontSizes.small,
                        paddingVertical: 0,
                        flex: 1,
                        paddingLeft: theme.spacing.base
                    }}
                    placeholder={t('Add a caption...')}
                />
                <AppButton paddingHorizontal='base' onPress={_handleSendFile}>
                    <SendIcon />
                </AppButton>
            </AppView>
        </AppBottomSheet>
    );
}

export default forwardRef(ModalAddCaption);
