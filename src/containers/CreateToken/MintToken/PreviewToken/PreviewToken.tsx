import {
  IFRAME_ALLOW,
  IFRAME_SANDBOX,
  IPFS_PREFIX_URL,
  MESSAGE_GET_CAPTURE_IMG,
  USE_REQUEST_ASSET_CAPTURE,
  USE_REQUEST_CAPTURE,
  USE_REQUEST_TOKEN_CAPTURE
} from '../../../../constants';
import { useEffect, useRef, useState } from 'react';
import { useCapture } from '../../../../hooks/use-capture/useCapture';
import { setMsg } from '../../../../services/snackbar';
import { useWindowSize } from '../../../../hooks/use-resized/useWindowSize';

interface IPreviewMedia {
  url: string;
  width: number;
  height: number;
  onPreview: (cid, hash) => void;
}
// TODO Almost duplicate PreviewMedia, two-one
const PreviewToken = ({ url, width, height, onPreview }: IPreviewMedia) => {
  const size = useWindowSize();
  const [scale, setScale] = useState<number>(0.4);
  const [render, setRender] = useState<boolean>(false);
  const refIframe = useRef<HTMLIFrameElement | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const {
    setup,
    capture,
    captureState: { loading, status, data }
  } = useCapture();
  // TODO Generate capture
  useEffect(() => {
    if (data) {
      onPreview(data.cid, ''); // TODO hash good?
    }
  }, [data]);

  const scaling = () => {
    if (refContainer.current) {
      // TODO Better fix size
      // @ts-ignore
      const w = refContainer.current?.parentNode?.clientWidth;
      // @ts-ignore
      const h = refContainer.current?.parentNode?.clientHeight;
      // const min = Math.min(w, h)-200;
      const sc = Math.min(w / width, h / height);
      setScale(sc);
    }
  };

  useEffect(() => {
    setRender(true);
    scaling();
  }, []);

  useEffect(() => {
    // window size
    scaling();
  }, [size]);

  useEffect(() => {
    if (loading) {
      setMsg({ title: status, kind: 'info' });
    } else {
      setMsg(null);
    }
  }, [loading]);

  return (
    <div className={'w-full overflow-hidden h-full'}>
      <div ref={refContainer} className={`relative flex justify-center items-center`}>
        <div style={{ width: width * scale, height: height * scale }}>
          {render && (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left'
              }}
              className={`relative select-none`}
            >
              <iframe
                {...setup({
                  ref: refIframe,
                  postData: {
                    type: USE_REQUEST_CAPTURE,
                    hash: '',
                    url
                  }
                })}
                ref={refIframe}
                width={'100%'}
                height={'100%'}
                src={url}
                onLoad={() => {
                  // TODO SEND TO READY CAPTURE
                  // setTimeout(() => {
                  //   capture();
                  // }, 500);
                }}
                className={'iframe select-none'}
                sandbox={IFRAME_SANDBOX}
                allow={IFRAME_ALLOW}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className={'w-full overflow-hidden h-full'}>
  //     {/*{data && (*/}
  //     {/*  <img*/}
  //     {/*    style={{*/}
  //     {/*      minWidth: '500px',*/}
  //     {/*      minHeight: '500px'*/}
  //     {/*    }}*/}
  //     {/*    alt={'Name'}*/}
  //     {/*    src={`${IPFS_PREFIX_URL}${data.cid}`}*/}
  //     {/*  />*/}
  //     {/*)}*/}
  //     <div ref={refContainer} className={`relative block`}>
  //       {render && (
  //         <div
  //           style={{
  //             width: `${width}px`,
  //             height: `${height}px`,
  //             transform: `scale(${scale})`,
  //             transformOrigin: 'top left'
  //           }}
  //           className={`relative`}
  //         >
  //           <iframe
  //             {...setup({
  //               ref: refIframe,
  //               postData: {
  //                 type: MESSAGE_GET_CAPTURE_IMG,
  //                 url: fullUrl
  //               }
  //             })}
  //             ref={refIframe}
  //             width={'100%'}
  //             height={'100%'}
  //             src={fullUrl}
  //             className={'iframe select-none'}
  //             sandbox={IFRAME_SANDBOX}
  //             allow={IFRAME_ALLOW}
  //           />
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default PreviewToken;
