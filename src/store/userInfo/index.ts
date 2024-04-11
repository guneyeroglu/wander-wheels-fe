import { create } from 'zustand';

import { IUser } from '../../global/interfaces/services/users';

interface IUserState extends IUser {
  setUserInfo: (state: IUser) => void;
}

export const useUserInfo = create<IUserState>()(set => ({
  id: '',
  mail: '',
  name: '',
  role: {
    id: 0,
    name: '',
  },
  setUserInfo: (newState: IUser) =>
    set(() => ({
      id: newState.id,
      mail: newState.mail,
      name: newState.name,
      role: newState.role,
    })),
}));
