import { IItem } from '../../types';
import { useEffect, useRef, useState } from 'react';
import { IMAGE_MIMETYPES } from '../../constants';
import { ipfsToUrl } from '../../utils';

export const ItemContent = ({ item }: { item: IItem }) => {
  const [render, setRender] = useState(false);
  const refItem = useRef<HTMLDivElement | null>(null);
  // TODO different size video,html,png and etc
  // const formats = item.metadata?.formats;
  // const withDim = formats?.filter((a) => a.dimensions);
  // let size = { width: item.width ?? 1000, height: item.height ?? 1000 };
  // if (withDim && (!item.width && !item.height)) {
  //   const dim = withDim[0].dimensions.value;
  //   size.width = parseInt(dim.split('x')[0]);
  //   size.height = parseInt(dim.split('x')[1]);
  // }

  useEffect(() => {
    setRender(true);
  }, [setRender]);

  const w = refItem.current?.clientWidth ?? 100;
  const h = refItem.current?.clientHeight ?? 100;
  return (
    <div className={'item relative'}>
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
        {render &&
          item.metadata?.formats?.map((format) => {
            return (
              <div key={format.mimeType}>
                {IMAGE_MIMETYPES.includes(format.mimeType) ? (
                  <img
                    style={{
                      width: `${w}px`,
                      height: `${h}px`
                    }}
                    className={'object-center object-contain'}
                    src={ipfsToUrl(item.metadata?.thumbnailUri ?? '')}
                    alt={item.name}
                  />
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
};
