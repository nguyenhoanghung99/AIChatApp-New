import React, { RefObject, memo, useMemo } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList, FlashListProps, ListRenderItem } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/themes';
import { AppView } from '@/components';

type TProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T> | null | undefined;
  isRefetching: boolean;
  refetch?: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isLoading: boolean;
  flashlistRef?: RefObject<FlashList<T>>;
} & FlashListProps<T>;
function AppFlashlist<T>({
  renderItem,
  data,
  refetch,
  isFetchingNextPage,
  hasNextPage,
  isLoading,
  flashlistRef,
  isRefetching,
  ...props
}: TProps<T>) {
  const { colors } = useTheme<Theme>();
  const { t } = useTranslation();

  const FootComponent = useMemo(() => {
    if (isFetchingNextPage) {
      return (
        <AppView
          flexDirection="row"
          alignContent="center"
          justifyContent="center">
          <ActivityIndicator color={colors.black} animating size={28} />
        </AppView>
      );
    }
    if (data.length && !hasNextPage) {
      return null;
    }
  }, [colors.black, data.length, hasNextPage, isFetchingNextPage]);
  const EmptyComponent = React.useMemo(() => {
    if (isLoading) {
      return (
        <AppView
          flexDirection="row"
          alignContent="center"
          justifyContent="center">
          <ActivityIndicator color={colors.black} animating size={28} />
        </AppView>
      );
    }
  }, [colors.black, isLoading]);
  return (
    <FlashList
      ref={flashlistRef}
      data={data}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={refetch && refetch}
          tintColor={colors.neutralGrey7}
          title={t('Refreshing')}
          collapsable={true}
        />
      }
      onEndReachedThreshold={0.01}
      scrollEventThrottle={16}
      ListFooterComponent={FootComponent}
      ListEmptyComponent={EmptyComponent}
      {...props}
    />
  );
}
export default memo(AppFlashlist);
