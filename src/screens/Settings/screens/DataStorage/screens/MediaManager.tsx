import { AppButton, AppIcon, AppSafeAreaView, AppText, AppView } from '@/components';
import { ScreenHeader } from '@/screens/Settings/components';
import { Icons } from '@/themes';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import MediaList from './widget/MediaList';

const RenderRoute = () => (
    <MediaList />
);

const renderScene = SceneMap({
    All: RenderRoute,
    Media: RenderRoute,
    File: RenderRoute,
});

export default function TabViewExample() {
    const layout = useWindowDimensions();
    const { t } = useTranslation();
    const [index, setIndex] = React.useState(0);
    const routes = [
        { key: 'All', title: 'All' },
        { key: 'Media', title: 'Media' },
        { key: 'File', title: 'File' },
    ];
    const _renderItem = (props: SceneRendererProps & {
        navigationState: NavigationState<{
            key: string;
            title: string;
        }>
    }) => {
        return <AppView flexDirection='row' paddingHorizontal='base' paddingVertical={'xxs'} gap='xs'>
            {props.navigationState.routes.map((el, i) => {
                return (
                    <AppButton
                        paddingHorizontal={'xs'}
                        key={`MediaManager${i}`}
                        bg={i == index ? 'color26':  'bgBlack'}
                        borderRadius={'massive'}
                        paddingVertical={'tiny'}
                        borderWidth={1}
                        borderColor='color26'
                        onPress={() => setIndex(i)}
                    >
                        <AppText color={i == index ? 'bgBlack':  'color26'}>{el.title}</AppText>
                    </AppButton>
                );
            })}
        </AppView>
    }
    return (
        <AppSafeAreaView backgroundColor="colorF5" flex={1}>
            <ScreenHeader title={t('Media, file larger than 5MB')} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={false}
                renderTabBar={_renderItem}
                initialLayout={{ width: layout.width }}
            />
        </AppSafeAreaView>
    );
}