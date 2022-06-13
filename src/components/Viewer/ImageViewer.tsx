import { IMetaFormat } from '../../types/metadata';
import { ipfsToUrl, s3ToUrl } from '../../utils';
import { IMAGE_MIMETYPES } from '../../constants';
import { useState } from 'react';

interface IImageViewer {
  width?: number;
  height?: number;
  formats: IMetaFormat[];
}

export const ImageViewer = ({ width, height, formats }: IImageViewer) => {
  const [error, setError] = useState(false);
  const imageFormat = (formats ?? []).find((a) => ['image/png', 'image/jpeg', 'image/jpg'].includes(a.mimeType));
  return (
    <div style={{ width, height }}>
      {error ? (
        <picture>
          <img alt={'Image'} src={ipfsToUrl(imageFormat?.uri ?? '')} />
        </picture>
      ) : (
        <picture>
          {IMAGE_MIMETYPES.map((mime) => {
            const source = formats.find((a) => a.mimeType === mime);
            if (!source) {
              return;
            }
            return [<source key={`${mime}_1`} srcSet={s3ToUrl(source.uri ?? '')} />, <source key={`${mime}_2`} srcSet={ipfsToUrl(source.uri ?? '')} />];
          })}
          <img
            alt={'Image'}
            src={s3ToUrl(imageFormat?.uri ?? '')}
            onError={(e) => {
              setError(true);
            }}
          />
        </picture>
      )}
    </div>
  );
};
