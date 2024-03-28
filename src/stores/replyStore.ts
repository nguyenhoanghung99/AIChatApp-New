import { create } from "zustand"

interface IReplyStoreState {
  replySender: TReplySender
  setReplySender: (value: TReplySender) => void
  resetReplySender: () => void;
}

const replySender: TReplySender = {
  message: null,
  subType: ""
}
export const useReplyStore = create<IReplyStoreState>((set, get) => ({
  replySender,
  setReplySender: (value: TReplySender) => set({ replySender: { ...get().replySender, ...value } }),
  resetReplySender: () => set({ replySender })
}))