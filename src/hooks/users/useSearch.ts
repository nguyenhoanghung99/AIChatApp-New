import {setParams} from './../../navigator/NavigationService';
import {useEffect, useMemo, useState} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {QueryKeys} from '@/constants';
import {UserService} from '@/services';
import {useDebounce} from '..';

export const useSearchUser = (delay = 1000) => {
  const {value: keyword, setValue: setKeyword} = useDebounce<string>({
    delay: delay,
    initialValue: '',
  });
  const [params, setParams] = useState<TSearchParams>({
    limit: 20,
    page: 1,
    search: '',
  });

  useEffect(() => {
    setParams(pre => ({...pre, search: keyword}));
  }, [keyword]);

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
    queryKey: [QueryKeys.LIST_USER, params],
    queryFn: ({pageParam}) =>
      UserService.searchUser({...params, page: pageParam}),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TListResponse<TUser>, allPages) => {
      if (
        +lastPage?.pagination?.page * params.limit >=
        +lastPage?.pagination?.total
      ) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const listUser = useMemo(() => {
    return data?.pages.flatMap(page => page?.data) ?? [];
  }, [data?.pages]);

  return {
    listUser,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    isRefetching,
    keyword,
    setKeyword,
  };
};
