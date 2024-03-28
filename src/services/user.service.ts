import {configs} from '@/constants';
import {HttpClient, URL_API} from './network';

class UserServiceApi extends HttpClient {
  constructor() {
    super(configs.CHAT_API_URL);
  }
  searchUser = async (params: TSearchParams) => {
    const {data} = await this.instance.get(URL_API.User.SearchUser, {params});
    return data;
  };
  findUserById = async (idUser: string) => {
    const {data} = await this.instance.get(URL_API.User.SearchUser, {
      params: {search: idUser},
    });
    return data;
  };
}
export const UserService = new UserServiceApi();
