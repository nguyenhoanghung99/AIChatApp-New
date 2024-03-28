import { AppView } from '@/components';
import { ImageDTO, useGallery } from '@/hooks';
import { Images, height, width } from '@/themes';
import React, { Ref, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { LayoutProvider, RecyclerListView } from 'recyclerlistview';

const AnimatedImage = Animated.createAnimatedComponent(
  FastImage as React.FC<FastImageProps>,
);

type TProps = {

}
const RenderCategoriesMenu = React.memo(({ item }: { item: ImageDTO }) => {
  return (
    <AppView key={item?.uri} style={styles.itemImage}>
      <AnimatedImage
        fallback
        source={{
          uri: item?.uri,
          cache: FastImage.cacheControl.cacheOnly,
          priority: FastImage.priority.high,
        }}
        defaultSource={Images.defaultImage}
        style={[{
          height: 120
        }]}
      />
    </AppView>
  )
}, (prevProps, nextProps) => prevProps.item.uri === nextProps.item.uri)
const AppChooseMedia = forwardRef(({ }: TProps, ref: Ref<BottomSheetRef>) => {
  const [visible, setVisible] = useState(false)
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const { photos, loadNextPagePictures, hasNextPage, isLoadingNextPage, checkPermission, dataProvider } = useGallery({ pageSize: 10000 })
  const [layoutProvider] = useState(new LayoutProvider(
    index => {
      return 0;
    },
    (type, dim) => {
      switch (type) {
        case 0:
          dim.height = 120;
          dim.width = width / 3;
          break;
        default:
          dim.height = 0;
          dim.width = 0;
      }
    }
  ))
  useImperativeHandle(ref, () => ({
    onCloseBotSheet: () => setVisible(false),
    onOpenBotSheet: () => setVisible(true),
  }));

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const renderItem = useCallback(
    (type: string | number, data: ImageDTO) => {
      return (
        <RenderCategoriesMenu item={data} />
      )
    }, [])
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => {
        setVisible(prev => !prev);
      }}
    >
      <RecyclerListView
        style={{ flex: 1 }}
        onEndReached={() => {
          if (isLoadingNextPage) return;
          if (hasNextPage) {
            loadNextPagePictures();
          }
        }}
        dataProvider={dataProvider}
        rowRenderer={renderItem}
        layoutProvider={layoutProvider}
        renderAheadOffset={height}
      />
    </Modal>
  )
})
const styles = StyleSheet.create({
  itemImage: {
    marginRight: 2,
    // flex: 1,
    // alignItems: 'stretch'
  },
  spinner: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
})
export default memo(AppChooseMedia)