import {ManagerOptions, SocketOptions} from 'socket.io-client';

export interface IUseSocket {
  uri: string;
  opts?: Partial<ManagerOptions & SocketOptions>;
}
