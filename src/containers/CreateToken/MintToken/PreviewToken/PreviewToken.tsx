import { IFRAME_ALLOW, IFRAME_SANDBOX, IPFS_PREFIX_URL, MESSAGE_GET_CAPTURE_IMG } from '../../../../constants';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { useCapture } from '../../../../hooks/use-capture/useCapture';
import Loader from '../../../../components/Utils/Loader';
import { useStore } from '../../../../store';
import { setMsg } from '../../../../services/snackbar';

interface IPreviewMedia {
  url: string;
}

const PreviewToken = ({ url }: IPreviewMedia) => {
  const [requestId, setRequestId] = useState<string>('initial');
  const refIframe = useRef<HTMLIFrameElement | null>(null);
  const {
    setup,
    capture,
    captureState: { loading, status, data }
  } = useCapture();
  // TODO Generate capture

  useEffect(() => {
    if (loading) {
      setMsg({ title: status, kind: 'info' });
    } else {
      setMsg(null);
    }
  }, [loading]);

  // useEffect(() => {
  //   return () => {};
  // }, []);
  const fullUrl = `${url}?immediately=1&requestId=${requestId}`;

  return (
    <div className={'w-full h-full flex justify-center items-center'}>
      {/*{data && (*/}
      {/*  <img*/}
      {/*    style={{*/}
      {/*      minWidth: '500px',*/}
      {/*      minHeight: '500px'*/}
      {/*    }}*/}
      {/*    alt={'Name'}*/}
      {/*    src={`${IPFS_PREFIX_URL}${data.cid}`}*/}
      {/*  />*/}
      {/*)}*/}
      <div
        style={{
          width: '500px',
          height: '500px'
        }}
        className={`flex relative justify-center items-center`}
      >
        <div
          style={{
            width: '500px',
            height: '500px'
          }}
          className={`relative`}
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

export default PreviewToken;
