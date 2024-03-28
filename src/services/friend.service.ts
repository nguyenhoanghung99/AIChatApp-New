import { configs } from "@/constants";
import { HttpClient, URL_API } from "@/services/network";

class FriendServiceApi extends HttpClient {
  constructor() {
    super(configs.CHAT_API_URL);
  }
  addFriend = async (form: TAddFriendForm) => {
    const { data } = await this.instance.post(URL_API.Friend.List, form)
    return data
  }
  blockFriend = async (form: TFriendForm) => {
    const { data } = await this.instance.post(URL_API.Friend.BlockFriend, form)
    return data
  }
  unBlockFriend = async (form: TFriendForm) => {
    const { data } = await this.instance.post(URL_API.Friend.UnBlockFriend,form)
    return data
  }
  unFriend = async (form: TFriendForm) => {
    const { data } = await this.instance.post(URL_API.Friend.UnFriend, form)
    return data
  }
  acceptFriend = async (form: TAcceptForm) => {
    const { data } = await this.instance.post(URL_API.Friend.Accept, form)
    return data
  }
  revokeFriend = async (requestId: string) => {
    const { data } = await this.instance.post(`${URL_API.Friend.Revoke}/${requestId}`)
    return data
  }
}
export const FriendService = new FriendServiceApi();
