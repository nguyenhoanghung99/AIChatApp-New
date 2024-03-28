import {create} from 'zustand';

interface IModalStoreState {
  isShowGoSetting: boolean;
  setIsShowGoSetting: () => void;
}
const isShowGoSetting: boolean = false;
export const useModalStore = create<IModalStoreState>(set => ({
  isShowGoSetting,
  setIsShowGoSetting: () =>
    set(state => ({isShowGoSetting: !state.isShowGoSetting})),
}));
