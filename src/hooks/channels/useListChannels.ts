import {useMemo, useState} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {QueryKeys} from '@/constants';
import {ChannelService} from '@/services';

export const useListChannels = () => {
  const [params] = useState<TChannelParams>({
    limit: 10,
    page: 1,
  });
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [QueryKeys.LIST_CHANNELS, params],
    queryFn: ({pageParam}) =>
      ChannelService.getListChannels({...params, page: pageParam}),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TListResponse<TRoom>, allPages) => {
      if (
        +lastPage?.pagination?.page * params.limit >=
        +lastPage?.pagination?.total
      ) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
  const channels = useMemo(() => {
    return data?.pages.flatMap(page => page?.data) ?? [];
  }, [data?.pages]);
  return {
    channels,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    isRefetching,
    params
  };
};
