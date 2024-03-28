/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useMemo} from 'react';
import {io} from 'socket.io-client';
import {container} from 'tsyringe';
import {Storage} from '@/utilities';
import {StorageKeys, configs} from '@/constants';

const storage = container.resolve(Storage);

export const useSocket = () => {
  const socket = useMemo(() => {
    const token = storage.getItem(StorageKeys.TOKEN);
    const socket_io = io(configs.CHAT_API_URL, {
      extraHeaders: {
        authorization: 'Bearer ' + token,
        RTF: `${storage.getItem(StorageKeys.REFRESH_TOKEN)}`,
      },
    });
    return socket_io;
  }, []);
  const onConnect = useCallback(
    (cb: () => void) => {
      socket.on('connect', cb);
    },
    [socket],
  );

  const onConnectError = useCallback(
    (cb: (arr: any) => void) => {
      socket.on('connect_error', cb);
    },
    [socket],
  );

  const onDisconnect = useCallback(
    (cb: (arr: any) => void) => {
      socket.on('disconnect', cb);
    },
    [socket],
  );

  const onReconnect = useCallback(
    (cb: (arr: any) => void) => {
      socket.on('reconnect', cb);
    },
    [socket],
  );

  useEffect(() => {
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [socket]);

  return {
    socket,
    onConnect,
    onConnectError,
    onDisconnect,
    onReconnect,
  };
};
