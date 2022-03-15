import { EDITOR_URL, IFRAME_ALLOW, IFRAME_SANDBOX } from '../../../constants';
import { useContext, useEffect, useRef } from 'react';
import { XContext } from '../../../providers/XProvider';

const IframeArt = () => {
  const xContext = useContext(XContext);
  const refIframe = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (refIframe.current?.contentWindow) {
        xContext.art?.setProxy(refIframe.current?.contentWindow);
      }
    }, 1000);
    xContext.art?.emit();
  }, []);

  return (
    <div className={'border-2 border-solid border-dark21 w-full h-full'}>
      <iframe ref={refIframe} width={'100%'} height={'100%'} src={EDITOR_URL} className={'iframe'} sandbox={IFRAME_SANDBOX} allow={IFRAME_ALLOW} />
    </div>
  );
};

export default IframeArt;
