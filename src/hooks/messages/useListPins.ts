import {useQuery} from '@tanstack/react-query';
import {MessageService} from '@/services';
import {QueryKeys} from '@/constants';

export const useListPins = () => {
  const {data, isLoading} = useQuery({
    queryKey: [QueryKeys.LIST_PINS],
    queryFn: () => MessageService.getListPins(),
  });
  return {
    data,
    isLoading,
  };
};
