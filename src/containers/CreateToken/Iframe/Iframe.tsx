import { EDITOR_URL, IFRAME_ALLOW, IFRAME_SANDBOX } from '../../../constants';
import { useStore } from '../../../store';

const IframeToken = ({ onLoad, check }: { onLoad?: (e: any) => void; check?: boolean }) => {
  const token = useStore((state) => state.token);

  return (
    <div className={'border border-solid border-dark4A w-full h-full'}>
      <iframe
        onLoad={(e) => {
          if (e.currentTarget) {
            token.setProxy((e.currentTarget as any).contentWindow);
            token.emit();
            onLoad?.(e);
          }
        }}
        width={'100%'}
        height={'100%'}
        src={check ? `${EDITOR_URL}&check=1` : EDITOR_URL}
        className={'iframe'}
        sandbox={IFRAME_SANDBOX}
        allow={IFRAME_ALLOW}
      />
    </div>
  );
};

export default IframeToken;
