import { create } from 'zustand';

import { IUser } from '../../global/interfaces/services/users';

interface IUserState extends IUser {
  setUserInfo: (state: Omit<IUserState, 'setUserInfo'>) => void;
}

export const useUserInfo = create<IUserState>()(set => ({
  id: '',
  mail: '',
  username: '',
  role: {
    id: 0,
    name: '',
  },
  fetchStatus: 'idle',
  setUserInfo: (newState: Omit<IUserState, 'setUserInfo'>) =>
    set(() => ({
      id: newState.id,
      mail: newState.mail,
      username: newState.username,
      role: newState.role,
    })),
}));
