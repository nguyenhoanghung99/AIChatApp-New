type TModalRef = {
  onClose: () => void;
  onShow: () => void;
};
type BottomSheetRef = {
  onCloseBotSheet: () => void;
  onOpenBotSheet: () => void;
};

type TPagination = {
  total: number;
  totalPage: number;
  page: string;
  limit: string;
};
