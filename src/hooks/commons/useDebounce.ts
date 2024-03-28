import {useEffect, useState} from 'react';

export type DebounceHookConfig<T> = {
  delay: number;
  initialValue: T;
};

export default function useDebounce<T>(config: DebounceHookConfig<T>) {
  const [searchTerm, setSearchTerm] = useState<T>(config.initialValue);
  const [search, setSearch] = useState<T>(config.initialValue);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(searchTerm);
    }, config.delay);

    return () => clearTimeout(delayDebounceFn);
  }, [config.delay, searchTerm]);

  return {
    value: search,
    setValue: setSearchTerm,
  };
}
