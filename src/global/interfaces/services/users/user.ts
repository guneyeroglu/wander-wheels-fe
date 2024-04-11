export interface IUser {
  id: string;
  username: string;
  mail: string;
  role: {
    id: number;
    name: string;
  };
}
