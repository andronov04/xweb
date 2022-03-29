import { EDITOR_URL, IFRAME_ALLOW, IFRAME_SANDBOX } from '../../../constants';
import { useEffect, useRef } from 'react';
import { useStore } from '../../../store';

const IframeArt = () => {
  const art = useStore((state) => state.token);
  const refIframe = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (refIframe.current?.contentWindow) {
        art.setProxy(refIframe.current?.contentWindow);
        art.emit();
      }
    }, 1000);
    // TODO Cleanup
  }, []);

  return (
    <div className={'border-2 border-solid border-dark21 w-full h-full'}>
      <iframe ref={refIframe} width={'100%'} height={'100%'} src={EDITOR_URL} className={'iframe'} sandbox={IFRAME_SANDBOX} allow={IFRAME_ALLOW} />
    </div>
  );
};

export default IframeArt;
