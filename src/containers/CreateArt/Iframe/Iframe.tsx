import { DEV_ASSET_URL, EDITOR_URL, MESSAGE_GET_ASSET_META, MESSAGE_SEND_ASSET } from '../../../constants';
import { useContext, useEffect, useRef, useState } from 'react';
import { XContext } from '../../../providers/XProvider';

const IframeArt = () => {
  const xContext = useContext(XContext);
  const refIframe = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const test_asset = {
      url: DEV_ASSET_URL ?? 'http://localhost:8001',
      metadata: {
        name: 'Suprematism'
      }
    };
    setTimeout(() => {
      refIframe.current?.contentWindow?.postMessage(
        {
          type: MESSAGE_SEND_ASSET,
          data: [test_asset]
        },
        EDITOR_URL
      );
      if (refIframe.current?.contentWindow) {
        xContext.art?.setProxy(refIframe.current?.contentWindow);
      }
    }, 1000);

    window.addEventListener(
      'message',
      (event) => {
        if (event.data?.type === MESSAGE_GET_ASSET_META) {
          // console.log('WEB', event.data);
        }
      },
      false
    );
  }, []);

  return (
    <div className={'border-2 border-solid border-dark21 w-full h-full'}>
      <iframe ref={refIframe} width={'100%'} height={'100%'} src={EDITOR_URL} className={'iframe'} sandbox={'allow-same-origin allow-scripts'} />
    </div>
  );
};

export default IframeArt;
