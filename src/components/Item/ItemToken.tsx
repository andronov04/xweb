import { IItem } from '../../types';
import { useWindowSize } from '../../hooks/use-resized/useWindowSize';
import { useEffect, useMemo, useRef, useState } from 'react';
import IframeToken from '../Iframe/IframeToken';
import { ipfsToUrl } from '../../utils';
import { mimeFriendlyName, mimeMap, sortMimeTypes, tokenFormats } from '../../utils/mime';
import { MimeType } from '../../types/mime';
import { IMetaFormat } from '../../types/metadata';
import { VideoViewer } from '../Viewer/VideoViewer';
import { ImageViewer } from '../Viewer/ImageViewer';
import { HTMLViewer } from '../Viewer/HTMLViewer';
import { SVGViewer } from '../Viewer/SVGViewer';
import { TextViewer } from '../Viewer/TextViewer';
import { GLBViewer } from '../Viewer/GLBViewer';

interface IItemComp {
  item: IItem;
  align?: 'right' | 'left';
  formats?: boolean;
}

const ItemToken = ({ item, formats: isFormats }: IItemComp) => {
  const size = useWindowSize();
  const formats = useMemo(() => item.metadata?.formats ?? [], [item]);
  const defaultMime = 'IMAGE'; //useMemo(() => formats.find((a) => a.mimeType.startsWith('image'))?.mimeType ?? '', [formats]);
  const [mime, setMime] = useState<string>(defaultMime);
  const [scale, setScale] = useState<number>(0.4);
  const [render, setRender] = useState<boolean>(false);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const width = item.width || 1000;
  const height = item.height || 1000;

  const scaling = useMemo(() => {
    return () => {
      if (refContainer.current) {
        // TODO Better fix size
        const w = (refContainer.current as HTMLElement).clientWidth;
        const h = (refContainer.current as HTMLElement).clientHeight;
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

  const imageFormat = (item.metadata?.formats ?? []).find((a) => ['image/png', 'image/jpeg', 'image/jpg'].includes(a.mimeType));

  return (
    <div ref={refContainer} className={'md:h-96 h-auto relative w-full flex flex-col'}>
      <div
        style={{
          width: '100%',
          paddingTop: '100%',
          position: 'relative'
        }}
      >
        <div className={'absolute top-0 left-0 w-full h-auto'}>
          <div className={'w-full overflow-hidden h-auto'}>
            <div className={`relative flex h-auto flex-col justify-center items-center`}>
              <div style={{ width: width * scale, height: height * scale }}>
                {render && (
                  <div
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left'
                    }}
                    className={`relative ${mime === MimeType.txt ? '' : 'select-none'}`}
                  >
                    {tokenFormats
                      .filter((a) => a.label === mime)
                      .map((fr) => {
                        const frtms = formats.filter((a) => fr.mimes.includes(a.mimeType)) as IMetaFormat[];
                        if (!frtms.length) {
                          return <div key={fr.label} />;
                        }
                        return (
                          <div key={fr.label} className={'w-full h-full relative'}>
                            {fr.label === 'VIDEO' ? <VideoViewer image={imageFormat} width={width} height={height} formats={frtms} /> : null}
                            {fr.label === 'IMAGE' ? <ImageViewer width={width} height={height} formats={frtms} /> : null}
                            {fr.label === 'HTML' ? <HTMLViewer width={width} height={height} formats={frtms} /> : null}
                            {fr.label === 'SVG' ? <SVGViewer width={width} height={height} formats={frtms} /> : null}
                            {fr.label === 'TEXT' ? <TextViewer width={width} height={height} formats={frtms} /> : null}
                            {fr.label === '3D' ? <GLBViewer image={imageFormat} width={width} height={height} formats={frtms} /> : null}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {isFormats ? (
            <nav className={'mt-2 flex justify-center'}>
              <ol className={'flex text-base gap-x-4'}>
                {tokenFormats
                  .filter((a) => formats.some((b) => a.mimes.includes(b.mimeType)))
                  .map((fr) => (
                    <li
                      key={fr.label}
                      onClick={() => {
                        setMime(fr.label);
                      }}
                      className={`${fr.label === mime ? 'text-active' : 'text-inactive'} text-thin hover:opacity-80 cursor-pointer`}
                    >
                      {fr.label}
                    </li>
                  ))}
              </ol>
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ItemToken;
