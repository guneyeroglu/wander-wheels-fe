import { IMessage } from './message';

export interface IError {
  message: string;
  name: string;
  code: string;
  status: number;
  response: {
    data: IMessage;
    status: number;
  };
}
