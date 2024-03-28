import {container} from 'tsyringe';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {StorageKeys} from '@/constants';
import {Storage} from '@/utilities';

interface IAuthStoreState {
  userInfo: TInfoUser;
  setUserInfo: (user: TInfoUser) => void;
  removeUserInfo: () => void;
}
const storage = container.resolve(Storage);
const userInfo: TInfoUser = {
  id: '',
  fullName: '',
  _id: '',
  email: '',
  password: '',
  avatar: '',
  role: '',
  loginType: undefined,
  refreshToken: '',
  referralId: '',
  status: undefined,
  totalRef: undefined,
  totalRefDaily: undefined,
  totalRefWeekly: undefined,
  totalRefMonthly: undefined,
  totalRefYear: undefined,
  totalRefPoints: undefined,
  totalRefDailyPoints: undefined,
  totalRefWeeklyPoints: undefined,
  totalRefMonthlyPoints: undefined,
  totalRefYearPoints: undefined,
  points: undefined,
  premiumCode: undefined,
  userTheme: undefined,
  birthday: '',
  gender: undefined,
  city: undefined,
  isPublic: false,
  yourStatus: undefined,
  createdAt: '',
  updatedAt: '',
  isDeleted: false,
};
export const useAuthStore = create<
  IAuthStoreState,
  [['zustand/persist', {userInfo: TInfoUser}]]
>(
  persist(
    (set, get) => ({
      userInfo,
      setUserInfo: (user: TInfoUser) =>
        set({userInfo: {...get().userInfo, ...user}}),
      removeUserInfo: () =>
        set({
          userInfo,
        }),
    }),
    {
      name: StorageKeys.USER_INFO, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => storage), // (optional) by default, 'localStorage' is used
    },
  ),
);
