import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';

const SNACKBAR_COLORS = {
  error: '#d94a48',
  warn: '#f78a31',
  info: '#3295d6',
  success: '#509a52'
};

const SnackBar = () => {
  const [message, setMessage] = useStore((state) => [state.message, state.setMessage], shallow);
  const [size, setSize] = useState({ top: 0, height: 0, width: 0 });
  useEffect(() => {
    const rect = document.querySelector('#header')?.getBoundingClientRect();
    if (rect) {
      const offset = 14;
      setSize({ top: rect.top + rect.height + offset, height: 40, width: rect.width });
    }
  }, []);

  return (
    <div
      style={{
        top: size.top,
        height: size.height,
        width: size.width
      }}
      className={'absolute '}
    >
      {message && (
        <div
          style={{
            backgroundColor: SNACKBAR_COLORS[message.kind]
          }}
          className={'font-thin text-sm px-2 py-1 w-full h-full rounded-sm'}
        >
          <div className={'flex items-center h-full w-full'}>
            <div className={'flex-grow'}>
              <h4>{message.title}</h4>
            </div>
            <div>.</div>
          </div>
          {/*<div>*/}
          {/*  loader*/}
          {/*</div>*/}
        </div>
      )}
    </div>
  );
};

export default SnackBar;
