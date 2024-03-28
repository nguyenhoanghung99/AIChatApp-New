import {configs} from '@/constants';
import {HttpClient, URL_API} from './network';

class AuthenServiceApi extends HttpClient {
  apiClient = null;
  constructor() {
    super(configs.API_URL);
  }
  loginEmail = async (form: TLoginEmail) => {
    const {data} = await this.instance.post(URL_API.Authen.LoginEmail, form);
    return data;
  };
  loginSocial = async (form: TLoginSocial) => {
    const {data} = await this.instance.post(URL_API.Authen.LoginSocial, form);
    return data;
  };
  register = async (form: FormData) => {
    const {data} = await this.instance.post(URL_API.Authen.Register, form);
    return data;
  };
  logout = async () => {
    const {data} = await this.instance.post(URL_API.Authen.Logout);
    return data;
  };
  updateProfile = async (form: FormData) => {
    const {data} = await this.instance.post(URL_API.Authen.UpdateProfile, form, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return data;
  };
  getProfileUser = async () => {
    try {
      const { data } = await this.instance.get(URL_API.Authen.Me);
      console.log("🚀 ~ AuthenServiceApi ~ getProfileUser= ~ data:", data)
    return data;
    } catch (error) {
      console.log('err', error)
    }
    
  };
  changePassword = async (form: TChangePassword) => {
    const {data} = await this.instance.post(
      URL_API.Authen.ChangePassword,
      form,
    );
    return data;
  };
}
export const AuthenService = new AuthenServiceApi();
