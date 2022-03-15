import { IFRAME_ALLOW, IFRAME_SANDBOX } from '../../../../constants';
import { useRef, useState } from 'react';
import { nanoid } from 'nanoid';

interface IPreviewMedia {
  url: string;
}

const PreviewMedia = ({ url }: IPreviewMedia) => {
  const [requestId, setRequestId] = useState<string>('');
  const refIframe = useRef<HTMLIFrameElement | null>(null);

  return (
    <div
      style={{
        width: '500px',
        height: '500px'
      }}
      className={'group bg-black flex relative justify-center items-center'}
    >
      <div className={'absolute z-10 w-full h-full flex flex-col gap-y-4 justify-center items-center'}>
        <button className={'block bg-black p-2 opacity-20 hover:opacity-80 rounded-sm'}>set as preview</button>
        <button
          onClick={() => {
            setRequestId(nanoid());
          }}
          className={'block bg-black p-2 opacity-20 hover:opacity-80 rounded-sm'}
        >
          show another
        </button>
      </div>

      <div
        style={{
          width: '500px',
          height: '500px'
        }}
        className={'relative cursor-pointer opacity-10 group-hover:opacity-100'}
      >
        <iframe
          ref={refIframe}
          width={'100%'}
          height={'100%'}
          src={`${url}?immediately=1&requestId=${requestId}`}
          className={'iframe select-none'}
          sandbox={IFRAME_SANDBOX}
          allow={IFRAME_ALLOW}
        />
      </div>
    </div>
  );
};

export default PreviewMedia;
