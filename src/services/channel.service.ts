import {configs} from '@/constants';
import {HttpClient, URL_API} from './network';

class ChannelServiceApi extends HttpClient {
  constructor() {
    super(configs.CHAT_API_URL);
  }
  getListChannels = async (params: TChannelParams) => {
    const {data} = await this.instance.get(URL_API.Channel.List, {params});
    return data;
  };
  deleteChannel = async () => {
    const {data} = await this.instance.delete(URL_API.Channel.Delete);
    return data;
  };
  pinChannel = async (form: TChannelActionForm) => {
    const {data} = await this.instance.post(URL_API.Channel.Pin, form);
    return data;
  };
  muteChannel = async (form: TChannelActionForm) => {
    const {data} = await this.instance.post(URL_API.Channel.Mute, form);
    return data;
  };
  createChannel = async (form: TCreateChannel) => {
    const {data} = await this.instance.post(
      URL_API.Channel.CreateChannel,
      form,
    );
    return data;
  };
}
export const ChannelService = new ChannelServiceApi();
