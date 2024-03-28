import { AppIcon, AppSafeAreaView, AppText, AppView } from '@/components';
import AppButton from '@/components/AppButton/AppButton';
import { Icons, theme } from '@/themes';
import React, {
    Ref,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';
import { NavigationState, SceneRendererProps, TabView } from 'react-native-tab-view';
import { FileSelectList, MediaSelectList, ModalAddCaption, ShareLocation } from './widget';

type TProps = {
    roomId: string;
};

function ModalMediaSelect({ roomId }: TProps, ref: Ref<TModalRef>) {
    const [isVisiable, setIsVisiable] = useState(false);
    const refModalAddCaption = useRef<TModalRef>(null);
    const { t } = useTranslation();
    const routes = [
        { key: 'Media', title: t('Media'), icon: Icons.Photo },
        { key: 'File', title: t('File'), icon: Icons.File },
        { key: 'Gift', title: t('Gift'), icon: Icons.Gift },
        { key: 'Contact', title: t('Contact'), icon: Icons.Contact },
        { key: 'Location', title: t('Location'), icon: Icons.LocationFill },
    ];

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const refTitle = React.useRef(t('Media'));

    useImperativeHandle(ref, () => ({
        onClose,
        onShow,
    }));
    const onClose = useCallback(() => {
        setIsVisiable(false);
    }, []);
    const onShow = useCallback(() => {
        setIsVisiable(true);
    }, []);

    const onShowAddCaption = () => {
        refModalAddCaption.current?.onShow();
    }

    const onCloseAddCaption = () => {
        refModalAddCaption.current?.onClose();
    }

    const _renderScene = (props: SceneRendererProps & {
        route: {
            key: string;
            title: string;
        };
    }) => {
        switch (props.route.key) {
            case 'Media':
                return <MediaSelectList onShowAddCaption={onShowAddCaption} onCloseAddCaption={onClose} roomId={roomId} />;
            case 'File':
                return <FileSelectList onShowAddCaption={onShowAddCaption} onCloseAddCaption={onCloseAddCaption} />;
            case 'Gift':
                return <AppView />;
            case 'Contact':
                return <AppView />;
            case 'Location':
                return <ShareLocation onCloseAddCaption={onClose} roomId={roomId} />;
            default:
                return <AppView />;
        }
    }


    const _renderItem = (props: SceneRendererProps & {
        navigationState: NavigationState<{
            key: string;
            title: string;
            icon: string;
        }>
    }) => {
        return <AppView flexDirection='row' paddingHorizontal='base' paddingVertical={'xxs'} justifyContent={'space-between'}>
            {props.navigationState.routes.map((el, i) => {
                return (
                    <AppButton
                        key={`ModalMediaSelect${i}`}
                        borderRadius={'massive'}
                        paddingVertical={'tiny'}
                        alignItems='center'
                        gap={'tiny'}
                        width={'20%'}
                        onPress={() => {
                            setIndex(i);
                            refTitle.current = el.title;
                        }}
                    >
                        <AppIcon name={el.icon} size={20} color={'black'} />
                        <AppText color={'marengo'} variant={'small'} >{el.title}</AppText>
                        {i === index && <AppView backgroundColor={'blue'} width={'60%'} alignSelf='center' height={3} borderRadius={'massive'} />}
                    </AppButton>
                );
            })}

        </AppView>
    }

    return (
        <Modal
            isVisible={isVisiable}
            avoidKeyboard
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            style={styles.container}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationInTiming={300}
            animationOutTiming={500}>
            <AppSafeAreaView height={'80%'} backgroundColor="white" borderTopLeftRadius={'base'} borderTopRightRadius={'base'} overflow={'hidden'}>
                <AppView flexDirection={'row'} justifyContent={'space-between'} alignItems='center'>
                    <AppButton padding={'base'} onPress={onClose}>
                        <AppText color={'lightLink'} variant={"headingR3"}>{t('Cancel')}</AppText>
                    </AppButton>
                    <AppText color={'neutralGrey8'} variant={'heading2'}>{refTitle.current}</AppText>
                    <AppButton padding={'base'}>
                        <AppIcon name={Icons.Search} size={24} color={theme.colors.lightLink} />
                    </AppButton>
                </AppView>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={_renderScene}
                    onIndexChange={setIndex}
                    lazy={false}
                    swipeEnabled={false}
                    tabBarPosition={'bottom'}
                    renderTabBar={_renderItem}
                    initialLayout={{ width: layout.width }}
                />
                <ModalAddCaption index={index} roomId={roomId} ref={refModalAddCaption} onCloseAddCaption={onClose} />
            </AppSafeAreaView>
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        margin: 0,
        justifyContent: 'flex-end',
    },
});
export default forwardRef(ModalMediaSelect);
