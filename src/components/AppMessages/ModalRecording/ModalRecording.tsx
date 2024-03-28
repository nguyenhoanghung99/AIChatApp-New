import { AppButton, AppIcon, AppText, AppView } from '@/components';
import React, {
    Ref,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, PermissionsAndroid, Platform, TextInput } from 'react-native';
import AppBottomSheet from '@/components/AppBottomSheet/AppBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { FontSizes, Icons, theme } from '@/themes';
import { SendIcon } from '@/assets/svg';
import { MediaDTO, useMutationMessageActions } from '@/hooks';
import { EventEmitter } from '@/utilities';
import { EMediaType, TYPE_MESSAGE } from '@/constants';
import uuid from 'react-native-uuid';
import RNFetchBlob from 'react-native-blob-util';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
    OutputFormatAndroidType,
    RecordBackType,
} from 'react-native-audio-recorder-player';
import * as mime from 'react-native-mime-types';


type TProps = {
    roomId: string;
};
const dirs = RNFetchBlob.fs.dirs;
const audioRecorderPlayer = new AudioRecorderPlayer();

function ModalRecording({ roomId }: TProps, ref: Ref<TModalRef>) {
    const { t } = useTranslation();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { onMessageActionSendMedia, setDataMessageLocal } = useMutationMessageActions();
    const snapPoints = useMemo(() => [1, 200], []);
    const refPath = useRef(`${dirs.CacheDir}/audio.mp3`);
    const [isRecording, setRecording] = useState(false);
    const [recordTime, setRecordTime] = useState('00:00:00');
    const [isStop, setStop] = useState(false);
    audioRecorderPlayer.setSubscriptionDuration(0.1);
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

    const onStartRecord = async (): Promise<void> => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);
                if (
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    if (Number(Platform.Version < 33) && grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                        PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('all perrmission success')
                    }
                } else {
                    console.log('All required permissions not granted');
                    return;
                }
            } catch (err) {
                return;
            }
        }
        setRecording(true);
        setStop(false);
        const audioSet: AudioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
            OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
        };
        const uri = await audioRecorderPlayer.startRecorder(
            refPath.current,
            audioSet,
        );
        audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
            setRecordTime(() => audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition)
            ))
        });
    };

    const onStopRecord = async (): Promise<void> => {
        if (isStop) {
            _handleSendFile();
            return;
        }
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setStop(true);
    };
    const onCancel = async () => {
        audioRecorderPlayer.stopRecorder();
        setRecording(false);
        setRecordTime('00:00:00')
    };

    const _handleSendFile = async () => {
        try {
            onClose();
            const formData = new FormData();
            formData.append('type', TYPE_MESSAGE.RECOD);
           const type = mime.lookup(refPath.current);
            formData.append('media', {
                uri: `file://${refPath.current}`,
                name: 'audio.mp3',
                type: type,
            });
            
            const _content = {
                data: {url: `file://${refPath.current}`, type: TYPE_MESSAGE.RECOD },
            };
            const form = {
                content:JSON.stringify(_content),
                subType: TYPE_MESSAGE.RECOD,
                replySender: null,
                idMessage: uuid.v4() as string,
                roomId,
                tag: [],
            } as TSendMessageSocket;
            setDataMessageLocal(form, roomId);
            onMessageActionSendMedia(formData, form);
            onCancel();
        } catch (error) {
            console.log('err', error)
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
            onClose={onClose}
            animateOnMount={true}>
            <AppView
                flexDirection='row'
                marginHorizontal='base'
            >
                <AppButton position={'absolute'} top={0} onPress={onClose}>
                    <AppIcon name={Icons.Close} size={16} />
                </AppButton>
                <AppView justifyContent='center' alignItems='center' flex={1} gap='md' mt={'xxl'}>
                    {!isRecording ? <>
                        <AppText variant={'rMedium'}>{t('Tap to record')}</AppText>
                        <AppButton
                            onPress={onStartRecord}
                            justifyContent='center'
                            alignItems='center'
                            borderRadius={'massive'}
                            width={50}
                            height={50}
                            borderWidth={1}
                            borderColor={'lightLink'}
                        >
                            <AppIcon name={Icons.KeyboardVoice} size={24} color={theme.colors.lightLink} />
                        </AppButton>
                    </>
                        :
                        <AppView gap='base' justifyContent='center' alignItems='center'>
                            <AppText variant={'heading3'}>{recordTime}</AppText>
                            <AppView flexDirection={'row'} gap='base'>
                                <AppButton
                                    borderRadius={'xs'}
                                    paddingVertical={'tiny'}
                                    alignSelf='flex-start'
                                    onPress={onStopRecord}
                                    paddingHorizontal='base'
                                    backgroundColor={'lightLink'}
                                >
                                    <AppText variant={'spanSemibold'} color='white'>{isStop ? t('Send') : t('Stop')}</AppText>
                                </AppButton>
                                {isStop && <AppButton
                                    borderRadius={'xs'}
                                    paddingVertical={'tiny'}
                                    alignSelf='flex-start'
                                    paddingHorizontal='base'
                                    backgroundColor={'lightLink'}
                                    onPress={onCancel}
                                >
                                    <AppText variant={'spanSemibold'} color='white'>{t('Cancel')}</AppText>
                                </AppButton>}
                            </AppView>

                        </AppView>
                    }
                </AppView>

            </AppView>
        </AppBottomSheet>
    );
}

export default forwardRef(ModalRecording);
