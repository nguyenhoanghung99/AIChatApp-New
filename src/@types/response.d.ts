type TListResponse<T> = {
  data: T[];
  message: 'OK' | 'ERROR';
  statusCode: number;
  pagination: TPagination;
};

type TPage = {
  page: number;
  limit: number;
  offset?: number;
  parentId?: number;
  type?: string;
  sortDirection?: string;
  sortBy?: string;
  search?: string;
};

type TLoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: 'OK' | 'ERROR';
  statusCode: number;
};

type TResponse<T> = {
  data: T;
  message: 'OK' | 'ERROR' | string;
  statusCode: number;
};

type TResponseLanguage<T> = {
  baseLanguage: string;
  language: string;
  data: T,
  country: TLanguage
}