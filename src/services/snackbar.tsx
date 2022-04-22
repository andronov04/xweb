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
  const options: any = {
    position: 'bottom-right',
    autoClose: msg?.autoClose ?? 5000,
    theme: 'dark',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };
  if (msg?.block) {
    options.icon = ({ theme, type }) => {
      return (
        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    };
  }
  getToast(msg?.kind ?? 'info')(msg?.title, options);
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
