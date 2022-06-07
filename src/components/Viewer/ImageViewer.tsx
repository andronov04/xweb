import { IMetaFormat } from '../../types/metadata';
import { ipfsToUrl } from '../../utils';

interface IImageViewer {
  width?: number;
  height?: number;
  formats: IMetaFormat[];
}

export const ImageViewer = ({ width, height, formats }: IImageViewer) => {
  // TODO Use avif use png use wemp and etc
  return (
    <div style={{ width, height }}>
      {formats.map((fr) => {
        return (
          <div
            key={fr.mimeType}
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${ipfsToUrl(fr.uri ?? '')})`
            }}
            className={'w-full h-full'}
          />
        );
      })}
    </div>
  );
};
