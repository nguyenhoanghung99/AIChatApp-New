export enum EModeTheme {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum CHAT_MESSAGE_TYPE {
  GROUP_CHAT = 'GROUP_CHAT',
  ONE_CHAT = 'ONE_CHAT',
}

export enum TYPE_MESSAGE {
  MEDIA = 'MEDIA',
  CONTACT = 'CONTACT',
  LOCATION = 'LOCATION',
  FILE = 'FILE',
  GIFT = 'GIFT',
  REPLY = 'REPLY',
  FORWARD = 'FORWARD',
  UNSEND = 'UNSEND',
  PIN = 'PIN',
  UNPIN = 'UNPIN',
  RECOD = 'RECOD',
}

export enum EMediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export enum EventSocketType {
  RECEIVE_GROUP_CHAT = 'receive-group-chat',
  GROUP_CHAT = 'group-chat',
  ERROR = 'error',
  JOIN_GROUP_CHAT = 'joinGroupChat',
  OUT_GROUP_CHAT = 'outGroupChat',
  RECEIVE_SEND_REACTIONS = 'receive-send-reactions'
}

export enum EACTION_MESSAGE {
  REPLY = 'Reply',
  COPY = 'Copy',
  PIN = 'Pin',
  UNPIN = 'Unpin',
  FORWARD = 'Forward',
  TRANSLATE = 'Translate',
  DELETE = 'Delete',
  RECALL = 'Recall',
  LIKE = 'Like',
  UNLIKE = 'Unlike',
  BOT = 'Bot',
}

export enum FriendStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  BLOCK = 'BLOCK',
  UNBLOCK = 'UNBLOCK',
}

export enum EMenuTitle {
  Email = 'Email',
  HeaderEmail = 'Change Email',
  Password = 'Password',
  HeaderPassword = 'Change Password',
  LinkAccount = 'Link Account',
  DeleteAccount = 'Delete Account',
  RequestReceived = 'Request Received',
  AccountRemove = 'Account removed',
}
