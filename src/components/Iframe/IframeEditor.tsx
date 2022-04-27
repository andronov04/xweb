import { EDITOR_URL, IFRAME_ALLOW, IFRAME_SANDBOX } from '../../constants';
import { useStore } from '../../store';
import { useEffect, useState } from 'react';
import Loader from '../../components/Utils/Loader';
import CustomButton from '../../components/CustomButton/CustomButton';

const IframeEditor = ({ onLoad, check }: { onLoad?: (e: any) => void; check?: boolean }) => {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [rnd, setRnd] = useState('');
  const token = useStore((state) => state.token);

  useEffect(() => {
    if (rnd) {
      setStatus('loading');
    }
  }, [rnd, setStatus]);

  const url = check ? `${EDITOR_URL}&check=1` : EDITOR_URL;
  return (
    <div className={'border relative border-solid border-dark4A w-full h-full'}>
      {status === 'loading' ? (
        <div className={'absolute z-20 w-full h-full'}>
          <div className={'w-full h-full bg-black absolute z-10 opacity-60'} />
          <div className={'absolute z-20 w-full h-full'}>
            <Loader />
          </div>
        </div>
      ) : null}
      {status === 'error' ? (
        <div className={'absolute z-40 w-full h-full'}>
          <div className={'w-full h-full bg-black absolute z-10 opacity-90'} />
          <div className={'absolute z-20 w-full h-full flex justify-center items-center'}>
            <CustomButton
              onClick={() => {
                setRnd(Math.random.toString());
              }}
              style={'white'}
              value={'Reload'}
            />
          </div>
        </div>
      ) : null}
      <iframe
        onLoad={(e) => {
          if (e.currentTarget) {
            setStatus('success');
            token.setProxy((e.currentTarget as any).contentWindow);
            token.emit();
            onLoad?.(e);
          }
        }}
        onError={() => {
          setStatus('error');
        }}
        width={'100%'}
        height={'100%'}
        src={`${url}&rnd=${rnd}`}
        className={'iframe'}
        sandbox={IFRAME_SANDBOX}
        allow={IFRAME_ALLOW}
      />
    </div>
  );
};

export default IframeEditor;
