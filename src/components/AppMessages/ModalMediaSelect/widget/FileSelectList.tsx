import { AppButton, AppFlashlist, AppRadio, AppText, AppView, LoadingComponent } from '@/components';
import React, { Ref, memo, useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { DOCUMENT, DOCUMENT_ENUM, MediaDTO, useAccessFile } from '@/hooks';
import RNFS from 'react-native-fs';
import { SVGMedia } from '@/assets/svg/media';
import {
    checkManagePermission,
    requestManagePermission,
} from 'manage-external-storage';
import * as mime from 'react-native-mime-types';


const FileSelectList = ({ onShowAddCaption, onCloseAddCaption }: {
    onShowAddCaption: () => void;
    onCloseAddCaption: () => void;
}) => {
    const [lstChoosen, setChoosenList] = useState<Number[]>([]);
    const [isLoading, setLoading] = useState(false);
    const { handleAccessFile } = useAccessFile();
    const [files, setFiles] = useState<MediaDTO[]>([]);
    useEffect(() => {
        _getData();
    }, []);
    const _getData = async () => {
        try {
            setLoading(true);
            const _handleGetFile = async () => {
                const res = await RNFS.readDir(Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath);
                if (res?.length) {
                    const result: MediaDTO[] = [];
                    res.forEach(async (el) => {
                        if (DOCUMENT.includes(el.name.split('.').pop() ?? '')) {
                            const type = mime.lookup(el.name);
                            result.push({
                                filename: el.name ?? '',
                                fileSize: el.size ?? 0,
                                uri: `file://${el.path}`,
                                type: type ?type : '',
                            })
                        }
                    });
                    setFiles(result);
                }
            }
            if (Platform.OS === 'android') {
                checkManagePermission().then((isManagePermitted) => {
                    if (!isManagePermitted) {
                        requestManagePermission().then((isManagePermitted) => {
                            _handleGetFile();
                        });
                    } else {
                        _handleGetFile();
                    }
                });
            } else {
                _handleGetFile();
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }

    }

    const _handleChoosenItem = (item: MediaDTO, id: number) => {
        const newArr = [...lstChoosen];
        const exist = newArr.findIndex(x => x == id);
        if (exist !== -1) {
            newArr.splice(exist, 1);
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
    };

    const _getIconFile = useCallback((type: string) => {
        switch (type) {
            case DOCUMENT_ENUM.DOC:
            case DOCUMENT_ENUM.DOCX:
            case DOCUMENT_ENUM.TXT:
                return <SVGMedia.DOC />
            case DOCUMENT_ENUM.EXCEL:
            case DOCUMENT_ENUM.EXCELX:
                return <SVGMedia.OTHER />
            case DOCUMENT_ENUM.PDF:
                return <SVGMedia.PDF />
            case DOCUMENT_ENUM.PPT:
            case DOCUMENT_ENUM.PPTX:
                return <SVGMedia.PPT />
            default:
                break;
        }
    }, [files]);


    const _renderItems = ({ item, index }: { item: MediaDTO, index: number }) => {
        const exist = lstChoosen.find(x => x == (index + 1));
        return (
            <AppButton
                key={`MediaSelectList${index}`}
                backgroundColor={'white'}
                flexDirection='row'
                alignItems='center'
                gap={'xxs'}
                marginBottom={'base'}
                justifyContent={'space-between'}
                borderBottomColor={'neutralGrey4'}
                borderBottomWidth={1}
                flex={1}
                paddingHorizontal='sm'
                paddingBottom='base'
                onPress={() => _handleChoosenItem(item, index + 1)}
            >
                {_getIconFile(item.filename.split('.').pop() ?? '')}
                <AppView flex={1}>
                    <AppText color={'neutralGrey9'} variant={'sMedium'}>{item.filename}</AppText>
                    <AppText color={'neutralGrey6'} variant={'small'}>{`${item.fileSize}kb`}</AppText>
                </AppView>
                <AppRadio onPress={() => _handleChoosenItem(item, index + 1)} value={exist ? true : false} title={''} />
            </AppButton>
        );
    };


    return (
        isLoading ? <LoadingComponent />
            :
            <AppFlashlist
                data={files}
                renderItem={_renderItems}
                estimatedItemSize={100}
                extraData={[lstChoosen, files]}
            />
    )
};
export default memo(FileSelectList);
