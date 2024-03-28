import { HttpClient, URL_API } from "@/services/network";

class SettingServiceApi extends HttpClient {
  constructor() {
    super();
  }
  getListLanguage = async () => {
    const { data } = await this.instance.get<TListResponse<TLanguage>>(URL_API.Setting.Language);
    return data;
  };
  getJsonLanguage = async (language: string) => {
    const { data } = await this.instance.get<TResponseLanguage<any>>(URL_API.Setting.JsonLanguage, {
      params: {
        language
      }
    });
    return data;
  }
  getLanguageSpeech = async (language: string) => {
    const { data } = await this.instance.get<TResponseLanguage<any>>(URL_API.Setting.LanguageSpeech, {
      params: {
        language
      }
    });
    return data;
  }
}
export const SettingService = new SettingServiceApi();
