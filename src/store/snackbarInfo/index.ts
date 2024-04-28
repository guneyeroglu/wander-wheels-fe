import { create } from 'zustand';

type SnackbarState = 'success' | 'danger' | 'warning' | 'info';

interface ISnackbar {
  open: boolean;
  title: string;
  subtitle?: string;
  state: SnackbarState;
}

interface ISnackbarState extends ISnackbar {
  setSnackbar: (state: ISnackbar) => void;
  setOpenSnackbar: (state: boolean) => void;
}

export const useSnackbarInfo = create<ISnackbarState>()(set => ({
  open: false,
  title: '',
  subtitle: undefined,
  state: 'success',
  setSnackbar: (newState: ISnackbar) =>
    set(() => ({
      open: newState.open,
      title: newState.title,
      subtitle: newState.subtitle ?? undefined,
      state: newState.state,
    })),
  setOpenSnackbar: (newState: boolean) =>
    set(() => ({
      open: newState,
    })),
}));
