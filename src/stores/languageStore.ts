import { create } from "zustand"

interface ILanguageStoreState {
  language: TLanguage
  setLanguage: (value: TReplySender) => void
  resetLanguage: () => void;
}

const language: TLanguage = {
  code: "",
  image: "",
  imageRound: "",
  locale: "",
  name: ""
}
export const useLanguageStore = create<ILanguageStoreState>((set, get) => ({
  language,
  setLanguage: (value: TReplySender) => set({ language: { ...get().language, ...value } }),
  resetLanguage: () => set({ language })
}))