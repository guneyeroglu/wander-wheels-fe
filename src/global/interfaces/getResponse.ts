export interface IGetResponseWithoutData {
  message: string;
  status: number;
}

export interface IGetResponse<T> extends IGetResponseWithoutData {
  data: T;
}
