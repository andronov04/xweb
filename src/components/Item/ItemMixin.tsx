import { IItem } from '../../types';
import { useRef, useState } from 'react';
import { IMAGE_MIMETYPES } from '../../constants';
import { ipfsToUrl, s3ToUrl } from '../../utils';

export const ItemContent = ({ item }: { item: IItem }) => {
  const [error, setError] = useState(false);
  const refItem = useRef<HTMLDivElement | null>(null);

  const imageFormat = (item.metadata?.formats ?? []).find((a) => ['image/png', 'image/jpeg', 'image/jpg'].includes(a.mimeType));
  return (
    <div className={'item relative w-full h-full'}>
      <div
        ref={refItem}
        className={'relative overflow-hidden'}
        style={{
          display: 'block',
          width: '100%',
          height: '0px',
          paddingBottom: `calc(100% / ${1})`
        }}
      >
        {error ? (
          <picture>
            <img alt={item.name} width={item.width ?? 1000} height={item.height ?? 1000} loading={'lazy'} src={ipfsToUrl(imageFormat?.uri ?? '')} />
          </picture>
        ) : (
          <picture>
            {IMAGE_MIMETYPES.map((mime) => {
              const source = item.metadata?.formats?.find((a) => a.mimeType === mime);
              if (!source) {
                return;
              }
              return [<source srcSet={s3ToUrl(source.uri ?? '')} />, <source srcSet={ipfsToUrl(source.uri ?? '')} />];
            })}
            <img
              loading={'lazy'}
              width={refItem.current?.offsetWidth ?? item.width ?? 1000}
              height={refItem.current?.offsetHeight ?? item.height ?? 1000}
              alt={item.name}
              src={s3ToUrl(imageFormat?.uri ?? '')}
              onError={(e) => {
                setError(true);
              }}
            />
          </picture>
        )}
      </div>
    </div>
  );
};
