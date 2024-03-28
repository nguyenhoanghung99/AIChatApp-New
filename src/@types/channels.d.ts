type TDefaultChannel = {
  title: string;
  content: string;
  avatar?: JSX.Element;
  onPress: () => void;
  createdTime?: string;
  isSeeAll?: boolean;
  backgroundColor?: TColors;
};

type TChannelItem = {};

type TChannelParams = {} & TPage;

type TSearchParams = {} & TPage;

type TCreateChannel = {
  members: Array<string>;
  roomName?: string;
};

type TRoom = {
  _id: string;
  isDeleted: boolean;
  member: any;
  lastSent: string;
  type: string;
  isActive: boolean;
  roomName: string;
  roomAvatar: string;
  codeRoom: string;
  roomMasterId: string;
  updatedAt: string;
  createAt: string;
  mute: any[];
  pin: any[];
  deleted: any[];
  pinMessage: any[];
  createdAt: string;
  __v: number;
  id: string;
  members: TMembers[];
  isPin: boolean;
  isMute: boolean;
  isFriend: boolean;
  lastMessage: TLastMessage;
  initMessageGroup: string;
};
type TMember = {
  [string]: number;
};
type TMembers = {
  _id: string;
  avatar: string;
  fullName: string;
  isOnline: boolean;
  roleRoom: string;
  searchable: boolean;
  friendship: string | null;
};

type TLastMessage = {
  answer: string;
  content: string;
  createAt: string;
  createdAt: string;
  id: string;
  idMessage: string;
  isDeleted: boolean;
  reaction: any[];
  replySender: any;
  room: string;
  statusMessage: string;
  subType: string;
  tag: string;
  type: string;
  updatedAt: string;
};

type TSender = {
  _id: string;
  isDeleted: boolean;
  avatar: string;
  fullName: string;
  searchable: boolean;
  isOnline: boolean;
  role: string;
  friends: any[];
  updatedAt: string;
  createAt: string;
  blocks: any[];
  createdAt: string;
  __v: number;
  id: string;
};

type TReplySender = {
  message: TMessage | null;
  subType: string;
};

type TUser = {
  friends: Array<string>;
  _id: string;
  isDeleted: boolean;
  avatar: string;
  fullName: string;
  searchable: boolean;
  isOnline: boolean;
  role: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  blocks: Array<string>;
  id: string;
  friendship: any;
};

type TChannelActionForm = {
  roomId: string;
};
