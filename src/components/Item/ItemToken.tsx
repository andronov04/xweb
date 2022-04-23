import { IItem } from '../../types';
import { useWindowSize } from '../../hooks/use-resized/useWindowSize';
import { useEffect, useMemo, useRef, useState } from 'react';
import IframeToken from '../Iframe/IframeToken';
import { ipfsToUrl } from '../../utils';
import { mimeMap } from '../../utils/mime';
import { MimeType } from '../../types/mime';

interface IItemComp {
  item: IItem;
  align?: 'right' | 'left';
}

const ItemToken = ({ item, align }: IItemComp) => {
  const size = useWindowSize();
  const formats = useMemo(() => item.metadata?.formats ?? [], [item]);
  const defaultMime = useMemo(() => formats.find((a) => a.mimeType.startsWith('image'))?.mimeType ?? '', [formats]);
  const [mime, setMime] = useState<string>(defaultMime);
  const [scale, setScale] = useState<number>(0.4);
  const [render, setRender] = useState<boolean>(false);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const width = item.width ?? 1000;
  const height = item.height ?? 1000;

  const scaling = useMemo(() => {
    return () => {
      if (refContainer.current) {
        // TODO Better fix size
        const w = (refContainer.current?.parentNode as HTMLElement).clientWidth;
        const h = (refContainer.current?.parentNode as HTMLElement).clientHeight;
        const sc = Math.min(w / width, h / height);
        setScale(sc);
      }
    };
  }, [setScale, height, width]);

  useEffect(() => {
    setRender(true);
    scaling();
  }, [scaling]);

  useEffect(() => {
    // window size
    scaling();
  }, [size, scaling]);

  const iframeUrl = ipfsToUrl(item.metadata?.artifactUri);

  return (
    <div className={'w-full overflow-hidden h-full'}>
      <div ref={refContainer} className={`relative flex flex-col justify-center ${align === 'right' ? 'items-end' : 'items-start'}`}>
        <div className={'overflow-hidden'} style={{ width: width * scale, height: height * scale }}>
          {render && (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left'
              }}
              className={`relative select-none`}
            >
              {formats
                .filter((frmt) => frmt.mimeType === mime)
                .map((frmt) => (
                  <div key={frmt.mimeType} className={'w-full h-full relative'}>
                    {frmt.mimeType === MimeType.html ? <IframeToken url={iframeUrl} width={width} height={height} /> : null}
                    {[MimeType.png, MimeType.jpeg].includes(frmt.mimeType as any) ? (
                      <div
                        style={{
                          backgroundSize: 'cover',
                          backgroundImage: `url(${ipfsToUrl(item.metadata?.displayUri ?? '')})`
                        }}
                        className={'w-full h-full'}
                      />
                    ) : null}
                  </div>
                ))}
            </div>
          )}
        </div>
        <nav className={'mt-2'}>
          <ol className={'flex text-sm gap-x-3'}>
            {formats.map((frmt) => (
              <li
                key={frmt.mimeType}
                onClick={() => {
                  setMime(frmt.mimeType);
                }}
                className={`${frmt.mimeType === mime ? 'text-active' : 'text-inactive'} text-thin hover:opacity-80 cursor-pointer`}
              >
                {mimeMap[frmt.mimeType] ?? 'UNKNOWN'}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default ItemToken;
