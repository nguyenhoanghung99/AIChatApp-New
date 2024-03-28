import {useMemo, useState} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {QueryKeys} from '@/constants';
import {MessageService} from '@/services';
import {getUniqueListBy} from '@/utilities';

export const useListMessages = (roomId: string) => {
  const [params] = useState<TPage>({
    limit: 30,
    page: 1,
    sortDirection: '-1',
    sortBy: 'createdAt',
  });
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [QueryKeys.LIST_MESSAGES, roomId],
    queryFn: ({pageParam}) =>
      MessageService.getListMessages({...params, page: pageParam, roomId}),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TListResponse<TMessage>, allPages) => {
      if (
        +lastPage?.pagination?.page * params.limit >=
        +lastPage?.pagination?.total
      ) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: !!roomId,
  });
  const messages = useMemo(() => {
    return data?.pages.flatMap(page => page?.data) ?? [];
  }, [data?.pages]);

  return {
    messages,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
    params,
  };
};
