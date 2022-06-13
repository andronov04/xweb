import { IItem } from '../../types';
import { useEffect, useRef, useState } from 'react';
import { IMAGE_MIMETYPES } from '../../constants';
import { ipfsToUrl, s3ToUrl } from '../../utils';

export const ItemContent = ({ item }: { item: IItem }) => {
  const [render, setRender] = useState(false);
  const [error, setError] = useState(false);
  const refItem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setRender(true);
  }, [setRender]);

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
        {render ? (
          <div
            style={{
              width: `${refItem.current?.offsetWidth ?? 100}px`,
              height: `${refItem.current?.offsetHeight ?? 100}px`
            }}
          >
            {error ? (
              <picture className={'object-contain'}>
                <img
                  style={{
                    width: `${refItem.current?.offsetWidth ?? 100}px`,
                    height: `${refItem.current?.offsetHeight ?? 100}px`
                  }}
                  className={'object-contain'}
                  alt={item.name}
                  width={item.width ?? 1000}
                  height={item.height ?? 1000}
                  // loading={'lazy'}
                  src={ipfsToUrl(imageFormat?.uri ?? '')}
                />
              </picture>
            ) : (
              <picture className={'object-contain'}>
                {IMAGE_MIMETYPES.map((mime) => {
                  const source = item.metadata?.formats?.find((a) => a.mimeType === mime);
                  if (!source) {
                    return;
                  }
                  return [<source key={`${mime}_1`} srcSet={s3ToUrl(source.uri ?? '')} />, <source key={`${mime}_2`} srcSet={ipfsToUrl(source.uri ?? '')} />];
                })}
                <img
                  style={{
                    width: `${refItem.current?.offsetWidth ?? 100}px`,
                    height: `${refItem.current?.offsetHeight ?? 100}px`
                  }}
                  className={'object-contain'}
                  // loading={'lazy'}
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
        ) : null}
      </div>
    </div>
  );
};
