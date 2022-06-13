import { IMetaFormat } from '../../types/metadata';
import { ipfsToUrl, s3ToUrl } from '../../utils';

interface IVideoViewer {
  width?: number;
  height?: number;
  formats: IMetaFormat[];
  image?: IMetaFormat;
}

export const VideoViewer = ({ width, height, image, formats }: IVideoViewer) => {
  // TODO Use Poster
  return (
    <div style={{ width, height }}>
      <video
        className={'w-full h-full'}
        poster={ipfsToUrl(image?.uri ?? '')}
        autoPlay={true}
        playsInline={true}
        loop={true}
        controls={true}
        crossOrigin={'anonymous'}
      >
        {formats.map((a) => [
          <source key={a.mimeType} src={s3ToUrl(a.uri ?? '')} type={a.mimeType} />,
          <source key={a.mimeType} src={ipfsToUrl(a.uri ?? '')} type={a.mimeType} />
        ])}
      </video>
    </div>
  );
};
