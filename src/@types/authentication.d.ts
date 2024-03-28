type TLoginEmail = {
  email: string;
  password: string;
  deviceName?: string;
  deviceId?: string;
  platform?: string;
  fcmToken?: string;
  ipAddress?: string;
};
type TLoginSocial = {
  type?: 'GOOGLE' | 'APPLE';
  idToken?: string;
  deviceName: string;
  deviceId: string;
  platform: string;
  fcmToken: string;
  ipAddress?: string;
};
type TRegister = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  deviceName?: string;
  deviceId?: string;
  platform?: string;
  notificationToken?: string;
  inviteCode?: string;
};

type TUpdateProfile = {
  fullName: string;
  avatar?: string;
  birthday: string;
  gender: number;
  bio: string;
};

type TChangePassword = {
  password: string;
  oldPassword: string;
  confirmPassword?: string;
};

type TAuthentication = {
  accessToken: string;
  refreshToken: string;
};

type TInfoUser = {
  id: string;
  fullName: string;
  _id: string;
  email: string;
  password?: string;
  avatar: string;
  role: string;
  loginType: any;
  refreshToken?: string;
  referralId: string;
  status: any;
  totalRef: any;
  totalRefDaily: any;
  totalRefWeekly: any;
  totalRefMonthly: any;
  totalRefYear: any;
  totalRefPoints: any;
  totalRefDailyPoints: any;
  totalRefWeeklyPoints: any;
  totalRefMonthlyPoints: any;
  totalRefYearPoints: any;
  points: any;
  premiumCode: any;
  userTheme: any;
  birthday: string;
  gender: any;
  city: any;
  isPublic: boolean;
  yourStatus: any;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};
