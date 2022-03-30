import { IFRAME_ALLOW, IFRAME_SANDBOX, IPFS_PREFIX_URL, USE_GET_CAPTURE, USE_REQUEST_ASSET_CAPTURE, USE_RESPONSE_CAPTURE } from '../../../../constants';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { useCapture } from '../../../../hooks/use-capture/useCapture';
import Loader from '../../../../components/Utils/Loader';
import { useStore } from '../../../../store';
import { setMsg } from '../../../../services/snackbar';
import { useWindowSize } from '../../../../hooks/use-resized/useWindowSize';

interface IPreviewMedia {
  url: string;
  width: number;
  height: number;
}

const PreviewMedia = ({ url, width, height }: IPreviewMedia) => {
  const size = useWindowSize();
  const [scale, setScale] = useState<number>(0.4);
  const [render, setRender] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>('initial');
  const refIframe = useRef<HTMLIFrameElement | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const {
    setup,
    capture,
    captureState: { loading, status, data }
  } = useCapture();
  // TODO Generate capture
  useEffect(() => {
    console.log('data', data);
    if (data) {
      // asset?.setPreview([data.cid], data.hash);
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

  const fullUrl = `${url}?immediately=1&requestId=${requestId}`;

  // TODO More options
  return (
    <div className={'w-full overflow-hidden h-full'}>
      <div ref={refContainer} className={`relative flex justify-center items-center`}>
        <div style={{ width: width * scale, height: height * scale }}>
          {!data ? (
            <div style={{ width: width * scale, height: height * scale }} className={'absolute z-10'}>
              <div className={`z-10 w-full h-full flex flex-col gap-y-4 justify-center items-center`}>
                {loading ? (
                  <div>
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
            </div>
          ) : null}

          {data && (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left'
              }}
              className={`relative select-none`}
            >
              <img alt={'Name'} className={'w-full h-full'} src={`${IPFS_PREFIX_URL}${data.cid}`} />
            </div>
          )}

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
                    type: USE_REQUEST_ASSET_CAPTURE,
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
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewMedia;

// import { IFRAME_ALLOW, IFRAME_SANDBOX, IPFS_PREFIX_URL, MESSAGE_GET_CAPTURE_IMG } from '../../../../constants';
// import { useEffect, useRef, useState } from 'react';
// import { nanoid } from 'nanoid';
// import { useCapture } from '../../../../hooks/use-capture/useCapture';
// import Loader from '../../../../components/Utils/Loader';
// import { useStore } from '../../../../store';
// import { setMsg } from '../../../../services/snackbar';
//
// interface IPreviewMedia {
//   url: string;
// }
//
// const PreviewMedia = ({ url }: IPreviewMedia) => {
//   const asset = useStore((state) => state.asset);
//   const [requestId, setRequestId] = useState<string>('initial');
//   const refIframe = useRef<HTMLIFrameElement | null>(null);
//   const {
//     setup,
//     capture,
//     captureState: { loading, status, data }
//   } = useCapture();
//
//
//   // console.log('loading', loading, status, data);
//   useEffect(() => {
//     if (data) {
//       asset?.setPreview([data.cid], data.hash);
//     }
//   }, [data]);
//
//   useEffect(() => {
//     if (loading) {
//       setMsg({ title: status, kind: 'info' });
//     } else {
//       setMsg(null);
//     }
//   }, [loading]);
//
//   // useEffect(() => {
//   //   return () => {};
//   // }, []);
//   const fullUrl = `${url}?immediately=1&requestId=${requestId}`;
//
//   return (
//     <div className={'w-full h-full flex justify-center items-center'}>
//       {data && (
//         <img
//           style={{
//             minWidth: '500px',
//             minHeight: '500px'
//           }}
//           alt={'Name'}
//           src={`${IPFS_PREFIX_URL}${data.cid}`}
//         />
//       )}
//       <div
//         style={{
//           width: '500px',
//           height: '500px'
//         }}
//         className={`${data ? 'hidden' : ''} group bg-black flex relative justify-center items-center`}
//       >
//         <div className={`absolute z-10 w-full h-full flex flex-col gap-y-4 justify-center items-center`}>
//           {loading ? (
//             <div>
//               <Loader />
//             </div>
//           ) : (
//             <div className={'flex flex-col gap-y-4 justify-center items-center'}>
//               <button onClick={capture} className={'block bg-black p-2 opacity-20 hover:opacity-80 rounded-sm'}>
//                 set as preview
//               </button>
//               <button
//                 onClick={() => {
//                   setRequestId(nanoid());
//                 }}
//                 className={'block bg-black p-2 opacity-20 hover:opacity-80 rounded-sm'}
//               >
//                 show another
//               </button>
//             </div>
//           )}
//         </div>
//
//         <div
//           style={{
//             width: '500px',
//             height: '500px'
//           }}
//           className={`relative ${loading ? 'invisible' : ''} cursor-pointer opacity-10 group-hover:opacity-100`}
//         >
//           <iframe
//             {...setup({
//               ref: refIframe,
//               postData: {
//                 type: MESSAGE_GET_CAPTURE_IMG,
//                 requestId,
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
//       </div>
//     </div>
//   );
// };
//
// export default PreviewMedia;
