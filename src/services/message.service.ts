import { configs } from '@/constants';
import { HttpClient, URL_API } from './network';

class MessageServiceApi extends HttpClient {
  constructor() {
    super(configs.CHAT_API_URL);
  }
  getDetailMessage = async (params: { id: string }) => {
    const { data } = await this.instance.get<TResponse<TDetailMessage>>(URL_API.Message.Detail, { params });
    return data;
  }
  getListMessages = async (params: TMessageParams) => {
    const { data } = await this.instance.get(URL_API.Message.List, { params });
    return data;
  };
  pinMessage = async (form: TPinMessageForm) => {
    const { data } = await this.instance.post(URL_API.Message.Pin, form);
    return data;
  };
  unPinMessage = async (form: TPinMessageForm) => {
    const { data } = await this.instance.post(URL_API.Message.UnPin, form);
    return data;
  };
  reactionMessage = async () => {
    const { data } = await this.instance.post(URL_API.Message.Reaction);
    return data;
  };
  translateMessage = async () => {
    const { data } = await this.instance.post(URL_API.Message.Translate);
    return data;
  };
  sendMessage = async () => {
    const { data } = await this.instance.post(URL_API.Message.Send);
    return data;
  };
  unSendMessage = async (form: TUnSendMessageForm) => {
    const { data } = await this.instance.post(URL_API.Message.UnSend, form);
    return data;
  };
  reportMessage = async () => {
    const { data } = await this.instance.post(URL_API.Message.Report);
    return data;
  };
  getListPins = async () => {
    const { data } = await this.instance.get(URL_API.Message.ListPin);
    return data;
  };
  sendMedia = async (data: FormData) => {
    console.log('dadadad', data)
    const res = await this.instance.post(URL_API.Message.SendMedia, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  };
}
export const MessageService = new MessageServiceApi();
