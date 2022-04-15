import { EDITOR_URL, IFRAME_ALLOW, IFRAME_SANDBOX } from '../../../constants';
import { useEffect, useRef } from 'react';
import { useStore } from '../../../store';

const IframeToken = ({ onLoad }: { onLoad?: (e: any) => void }) => {
  const token = useStore((state) => state.token);
  const refIframe = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (refIframe.current?.contentWindow) {
      token.setProxy(refIframe.current?.contentWindow);
      token.emit();
    }
    // setTimeout(() => {
    //
    // }, 1000);
    // TODO Cleanup
  }, []);

  return (
    <div className={'border border-solid border-dark4A w-full h-full'}>
      <iframe
        onLoad={onLoad}
        ref={refIframe}
        width={'100%'}
        height={'100%'}
        src={EDITOR_URL}
        className={'iframe'}
        sandbox={IFRAME_SANDBOX}
        allow={IFRAME_ALLOW}
      />
    </div>
  );
};

export default IframeToken;
