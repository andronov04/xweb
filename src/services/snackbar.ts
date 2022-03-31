import { toast } from 'react-toastify';
import { IMessageBar } from '../types/store';
const getToast = (kind: 'error' | 'warn' | 'info' | 'success') => {
  let t: any = toast;
  switch (kind) {
    case 'error':
      t = toast.error;
      break;
    case 'info':
      t = toast.info;
      break;
    case 'warn':
      t = toast.warn;
      break;
    case 'success':
      t = toast.success;
      break;
  }
  return t;
};
export const setMsg = (msg: IMessageBar | null = null) => {
  getToast(msg?.kind ?? 'info')(msg?.title, {
    position: 'bottom-right',
    autoClose: 5000,
    theme: 'dark',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};
