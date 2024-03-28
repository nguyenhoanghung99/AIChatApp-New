declare module 'react-native-config' {
  export interface NativeConfig {
    ENV?: string;
    ENDPOINT_API_URL?: string;
    GOOGLE_MAP_KEY?: string;
    ENDPOINT_CHAT_API_URL?: string;
    ENDPOINT_SOCKET_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
