import { IFRAME_ALLOW, IFRAME_SANDBOX } from '../../constants';

interface ITokenView {
  url: string;
}

// Token Viewer
const Token = ({ url }: ITokenView) => {
  return (
    <div className={'w-full h-full flex justify-center items-center'}>
      <div
        style={{
          width: '500px',
          height: '500px'
        }}
        className={`relative`}
      >
        <iframe width={'100%'} height={'100%'} src={url} className={'iframe'} sandbox={IFRAME_SANDBOX} allow={IFRAME_ALLOW} />
      </div>
    </div>
  );
};

export default Token;
