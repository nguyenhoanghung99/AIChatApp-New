import { useCallback, useEffect, useState } from 'react';
import { EventSocketType, configs } from '@/constants';
import { useSocket } from '..';

export const useSocketChatMessage = () => {
  const { socket, onConnectError } = useSocket();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on(EventSocketType.ERROR, data => {
      console.log(data);
    });
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    onConnectError(err => {
      console.log('🚀 ~ useEffect ~ err:', err);
    });
  }, []);

  const connect = useCallback(() => {
    socket.connect();
  }, [socket]);
  const disconnect = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  const onSendMessageSocket = useCallback(
    (data: TSendMessageSocket) => {
      console.log(data);
      socket.emit(EventSocketType.GROUP_CHAT, data);
    },
    [socket],
  );

  const onReceiveMessageSocket = useCallback(
    (callback: (data: any) => void) => {
      socket.on(EventSocketType.RECEIVE_GROUP_CHAT, callback);
    },
    [socket],
  );

  const onJoinGroupChatSocket = useCallback(({ roomId }: { roomId: string }) => {
    socket.emit(EventSocketType.JOIN_GROUP_CHAT, { roomId });
  }, [])

  const onOutGroupChatSocket = useCallback(({ roomId }: { roomId: string }) => {
    socket.emit(EventSocketType.OUT_GROUP_CHAT, { roomId });
  }, [])

  return {
    connect,
    disconnect,
    isConnected,
    onSendMessageSocket,
    onReceiveMessageSocket,
    onJoinGroupChatSocket,
    onOutGroupChatSocket
  };
};
