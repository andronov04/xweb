import { IMessageBar } from '../types/store';
import { useStore } from '../store';

export const setMsg = (msg: IMessageBar | null = null) => {
  useStore.getState().setMessage(msg);
};
