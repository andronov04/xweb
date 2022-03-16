import { IFRAME_ALLOW, IFRAME_SANDBOX, IPFS_PREFIX_URL, MESSAGE_GET_CAPTURE_IMG } from '../../../../constants';
import { useContext, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { useCapture } from '../../../../hooks/use-capture/useCapture';
import Loader from '../../../../components/Utils/Loader';
import { XContext } from '../../../../providers/XProvider';

interface IPreviewMedia {
  url: string;
}

const PreviewMedia = ({ url }: IPreviewMedia) => {
  const xContext = useContext(XContext);
  const [requestId, setRequestId] = useState<string>('initial');
  const refIframe = useRef<HTMLIFrameElement | null>(null);
  const {
    setup,
    capture,
    captureState: { loading, status, data }
  } = useCapture();

  // console.log('loading', loading, status, data);
  useEffect(() => {
    if (data) {
      console.log('xContext', xContext);
      xContext?.asset?.setPreview([data.cid], data.hash);
    }
  }, [data]);

  // useEffect(() => {
  //   return () => {};
  // }, []);
  const fullUrl = `${url}?immediately=1&requestId=${requestId}`;

  return (
    <div className={'w-full h-full flex justify-center items-center'}>
      {data && (
        <img
          style={{
            minWidth: '500px',
            minHeight: '500px'
          }}
          alt={'Name'}
          src={`${IPFS_PREFIX_URL}${data.cid}`}
        />
      )}
      <div
        style={{
          width: '500px',
          height: '500px'
        }}
        className={`${data ? 'hidden' : ''} group bg-black flex relative justify-center items-center`}
      >
        <div></div>
        <div className={`absolute z-10 w-full h-full flex flex-col gap-y-4 justify-center items-center`}>
          {loading ? (
            <div>
              <p className={'font-thin text-center'}>{status}</p>
              <Loader />
            </div>
          ) : (
            <div className={'flex flex-col gap-y-4 justify-center items-center'}>
              <button onClick={capture} className={'block bg-black p-2 opacity-20 hover:opacity-80 rounded-sm'}>
                set as preview
              </button>
              <button
                onClick={() => {
                  setRequestId(nanoid());
                }}
                className={'block bg-black p-2 opacity-20 hover:opacity-80 rounded-sm'}
              >
                show another
              </button>
            </div>
          )}
        </div>

        <div
          style={{
            width: '500px',
            height: '500px'
          }}
          className={`relative ${loading ? 'invisible' : ''} cursor-pointer opacity-10 group-hover:opacity-100`}
        >
          <iframe
            {...setup({
              ref: refIframe,
              postData: {
                type: MESSAGE_GET_CAPTURE_IMG,
                requestId,
                url: fullUrl
              }
            })}
            ref={refIframe}
            width={'100%'}
            height={'100%'}
            src={fullUrl}
            className={'iframe select-none'}
            sandbox={IFRAME_SANDBOX}
            allow={IFRAME_ALLOW}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewMedia;
