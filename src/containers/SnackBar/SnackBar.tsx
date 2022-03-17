import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';
import { setMsg } from '../../services/snackbar';

const SNACKBAR_COLORS = {
  error: '#d94a48',
  warn: '#f78a31',
  info: '#3295d6',
  success: '#509a52'
};
const SNACKBAR_TIME = 3000;

const SnackBar = () => {
  const [message, setMessage] = useStore((state) => [state.message, state.setMessage], shallow);
  const [size, setSize] = useState({ top: 0, height: 0, width: 0 });
  const timer = useRef<any>(null);

  useEffect(() => {
    const rect = document.querySelector('#header')?.getBoundingClientRect();
    if (rect) {
      const offset = 14;
      setSize({ top: rect.top + rect.height + offset, height: 40, width: rect.width });
    }
  }, []);

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      setMsg(null);
    }, SNACKBAR_TIME);

    return () => {
      clearInterval(timer.current);
    };
  }, [message]);

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
          className={'font-thin text-sm p-1 w-full h-full rounded-sm'}
        >
          <div className={'flex items-center h-full w-full'}>
            <div className={'flex-grow pl-1.5'}>
              <h4>{message.title}</h4>
              {message.description && <p className={'text-mini'}>{message.description}</p>}
            </div>
            <div
              onClick={() => {
                setMessage(null);
              }}
              className={'cursor-pointer hover:opacity-80'}
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 9L9 35" stroke="#EAEAEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M35 35L9 9" stroke="#EAEAEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
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
