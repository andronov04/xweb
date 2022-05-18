import {
  IFRAME_ALLOW,
  IFRAME_SANDBOX,
  IPFS_PREFIX_URL,
  MOULDER_CMD_REQUEST_CAPTURE,
  USE_REQUEST_ASSET_CAPTURE,
  USE_REQUEST_CAPTURE
} from '../../../../constants';
import { useEffect, useRef, useState } from 'react';
import { useCapture } from '../../../../hooks/use-capture/useCapture';
import Loader from '../../../../components/Utils/Loader';
import { setMsg } from '../../../../services/snackbar';
import { useWindowSize } from '../../../../hooks/use-resized/useWindowSize';
import { generateHash } from '../../../../utils';

interface IPreviewMedia {
  url: string;
  width: number;
  height: number;
  onPreview: (cid, hash) => void;
}
// TODO Almost duplicate PreviewToken, two-one
const PreviewMedia = ({ url, width, height, onPreview }: IPreviewMedia) => {
  const size = useWindowSize();
  const [hash, setHash] = useState<string>(generateHash());
  const [scale, setScale] = useState<number>(0.4);
  const [render, setRender] = useState<boolean>(false);
  const refIframe = useRef<HTMLIFrameElement | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const {
    setup,
    capture,
    captureState: { loading, status, data }
  } = useCapture();

  useEffect(() => {
    if (data) {
      onPreview(data.cid, hash);
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
      setMsg({ block: true, autoClose: false, title: status, kind: 'info' });
    } else {
      setMsg({ clear: true });
    }
  }, [loading]);

  const fullUrl = `${url}${hash}`;

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
                        setHash(generateHash());
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
                    type: MOULDER_CMD_REQUEST_CAPTURE,
                    hash,
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
