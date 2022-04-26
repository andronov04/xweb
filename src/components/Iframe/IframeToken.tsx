import { IFRAME_ALLOW, IFRAME_SANDBOX } from '../../constants';
import { useEffect, useState } from 'react';
import Loader from '../../components/Utils/Loader';
import CustomButton from '../../components/CustomButton/CustomButton';

interface IIframeToken {
  onLoad?: (e: any) => void;
  url: string;
  width: number;
  height: number;
}

const IframeToken = ({ url, onLoad }: IIframeToken) => {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [rnd, setRnd] = useState('');

  useEffect(() => {
    if (rnd) {
      setStatus('loading');
    }
  }, [rnd, setStatus]);

  const isParams = Object.keys(new URLSearchParams(url)).length > 0;

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
            onLoad?.(e);
          }
        }}
        onError={() => {
          setStatus('error');
        }}
        width={'100%'}
        height={'100%'}
        frameBorder="0"
        src={`${url}${isParams ? '&' : '?'}rnd=${rnd}`}
        className={'iframe overflow-hidden'}
        sandbox={IFRAME_SANDBOX}
        allow={IFRAME_ALLOW}
      />
    </div>
  );
};

export default IframeToken;
