export interface IUser {
  id: string;
  name: string;
  mail: string;
  role: {
    id: number;
    name: string;
  };
}
