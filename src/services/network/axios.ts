import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import queryString from 'query-string';
import {URL_API} from './endpoint';
import {container} from 'tsyringe';
import {Storage} from '@/utilities';
import {StorageKeys, configs} from '@/constants';

interface IOptions {
  timeout: number;
  language: 'en' | 'vi';
}
const storage = container.resolve(Storage);

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  constructor(baseURL?: string, options = {} as IOptions) {
    this.instance = axios.create({
      baseURL: baseURL || configs.API_URL,
      paramsSerializer: this.getRequestParams,
      timeout: options?.timeout || 20000,
      headers: {
        'Content-type': 'application/json',
      },
    });
    this.requestInterceptor();
    this.responseInterceptor();
  }
  private getRequestParams(params = {}) {
    return queryString.stringify(params);
  }

  private requestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  }
  private responseInterceptor() {
    const interceptor = this.instance.interceptors.response.use(
      this._handleResponse,
      async (error: AxiosError) => {
        const originalConfig = error?.config as InternalAxiosRequestConfig;
        const token = await storage.getItem(StorageKeys.TOKEN);
        const refreshToken = await storage.getItem(StorageKeys.REFRESH_TOKEN);
        const isTokenExpired =
          token && [401, 403].includes(error?.response?.status as number);
        if (isTokenExpired) {
          if (refreshToken) {
            // Eject the interceptor so it doesn't loop in case
            this.instance.interceptors.response.eject(interceptor);
            // handle refresh token when the token has expired
            return this.handleRefreshToken(refreshToken, originalConfig);
          } else {
            // Do something when expired token
          }
        }

        return Promise.reject(error?.response?.data || error?.message);
      },
    );
  }
  private _handleResponse(response: AxiosResponse) {
    return response;
  }

  private handleRefreshToken = async (
    refreshToken: string,
    originalConfig: InternalAxiosRequestConfig,
  ): Promise<AxiosRequestConfig | void> => {
    // Call RefreshToken API
    return axios
      .post(
        `${configs.API_URL}${URL_API.Authen.Refresh}`,
        {refreshToken},
        {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
        }
      )
      .then(async (response: AxiosResponse) => {
        const { accessToken, refreshToken } = response?.data?.data
        // Save new Token and RefreshToken
        await storage.setItem(StorageKeys.TOKEN, accessToken);
        await storage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
        this.instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        return this.instance(originalConfig);
      })
      .catch((error: any) => {
        console.log('handleRefreshToken error', error);
        // Remove all keys and back to login screen to get new token
        // storage.removeItem(StorageKeys.TOKEN);
        // storage.removeItem(StorageKeys.REFRESH_TOKEN);
      });
  };
  private _handleError({response, message}: AxiosError) {
    return Promise.reject(response?.data || message);
  }
  private async _handleRequest(
    config: InternalAxiosRequestConfig<AxiosRequestConfig>,
  ) {
    const token = await storage.getItem(StorageKeys.TOKEN);
    if (token) {
      (config.headers as AxiosRequestHeaders).Authorization = 'Bearer ' + token;
    }
    return config;
  }
}
