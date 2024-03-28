type TMessageParams = {
  roomId: string;
} & TPage;

type TMessage = {
  replySender?: TMessage;
  _id: string;
  idMessage: string;
  isDeleted: boolean;
  content: string;
  sender: TSender;
  room: string;
  type: string;
  answer: string;
  updatedAt: string;
  createdAt: string;
  reaction: any[];
  __v: number;
  subType: string;
  id: string;
  isLike: boolean;
  statusMessage: string;
  isPinMessage: boolean
};
type TSendMessageSocket = {
  content: string;
  subType: string;
  replySender?: TSender | null;
  idMessage: string;
  roomId: string;
  tag: String[];
  caption?: string;
};

type TMessageProps = {
  content: string;
  justify:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined;
  avatar: string;
  isMyMessage: boolean;
  idMessage?: string;
  message: TMessage;
  roomId: string;
  isPinMessage: boolean
}


type TDetailMessage = TRoom & {
  listPins: TMessagePin[];
}

type TMessagePin = {
  messageId?: string;
  idMessage?: string;
  roomId: string;
  name?: string;
  content?: string;
  userNamePin?: string;
  userIdPin?: string;
  message_Id?: string;
  avatarMessagesPin: string;
}

type TPinMessageForm = {
  roomId: string
  messageId: string
  userIdPin: string
  idMessage: string
}
type TUnSendMessageForm = {
  idMessage: string
}