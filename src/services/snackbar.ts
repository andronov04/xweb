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

export const setMsg = (msg: IMessageBar | null = null): void => {
  if (msg?.clear) {
    clearMsg();
  }
  if (!msg?.title) {
    return;
  }
  if (msg?.block) {
    document.body.classList.add('pointer-events-none', 'cursor-progress');
  }
  getToast(msg?.kind ?? 'info')(msg?.title, {
    position: 'bottom-right',
    autoClose: msg?.autoClose ?? 5000,
    theme: 'dark',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};

toast.onChange((payload: any) => {
  switch (payload.status) {
    case 'added':
      // new toast added
      break;
    case 'updated':
      // toast updated
      break;
    case 'removed':
      // toast has been removed
      document.body.classList.remove('pointer-events-none', 'cursor-progress');
      break;
  }
});

export const clearMsg = (): void => {
  document.body.classList.remove('pointer-events-none', 'cursor-progress');
  toast.dismiss();
};

//const response = await toast.promise(
//     fetch("A_URL"),
//     {
//       pending: 'Promise is pending',
//       success: 'Promise resolved 👌',
//       error: 'Promise rejected 🤯'
//     }
// );
// console.log(response)
