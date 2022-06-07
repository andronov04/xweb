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

  const iframeUrl = ipfsToUrl(item.metadata?.artifactUri);

  //  ${align === 'right' ? 'items-end' : 'items-start'}
  //  style={{ flex: '1 0' }}
  const imageFormat = formats.find((a) => a.mimeType.startsWith('image'));

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
                    {/*{formats*/}
                    {/*  .filter((frmt) => frmt.mimeType === mime)*/}
                    {/*  .map((frmt) => (*/}
                    {/*    <div key={frmt.mimeType} className={'w-full h-full relative'}>*/}
                    {/*      {frmt.mimeType === MimeType.html ? <IframeToken url={ipfsToUrl(frmt.uri ?? '')} width={width} height={height} /> : null}*/}
                    {/*      {[MimeType.png, MimeType.jpeg].includes(frmt.mimeType as MimeType) ? (*/}
                    {/*        <div*/}
                    {/*          style={{*/}
                    {/*            backgroundSize: 'cover',*/}
                    {/*            backgroundImage: `url(${ipfsToUrl(frmt.uri ?? '')})`*/}
                    {/*          }}*/}
                    {/*          className={'w-full h-full'}*/}
                    {/*        />*/}
                    {/*      ) : null}*/}
                    {/*      /!*<iframe frameBorder="0" src={ipfsToUrl(frmt.uri ?? '')} width={'100%'} height={'100%'} />*!/*/}
                    {/*      {[MimeType.svg].includes(frmt.mimeType as MimeType) ? (*/}
                    {/*        <SvgViewer width={item.width} height={item.height} url={ipfsToUrl(frmt.uri ?? '')} />*/}
                    {/*      ) : null}*/}
                    {/*      {[MimeType.txt].includes(frmt.mimeType as MimeType) ? (*/}
                    {/*        <TextViewer width={item.width} height={item.height} url={ipfsToUrl(frmt.uri ?? '')} />*/}
                    {/*      ) : null}*/}
                    {/*      {[MimeType.glb].includes(frmt.mimeType as MimeType) ? (*/}
                    {/*        <div*/}
                    {/*          className={'w-full h-full pre-model-viewer'}*/}
                    {/*          dangerouslySetInnerHTML={{*/}
                    {/*            __html: `<model-viewer alt="${item.name}" src="${ipfsToUrl(*/}
                    {/*              frmt.uri ?? ''*/}
                    {/*            )}" style="background-color: unset;" exposure="0.5" poster="${ipfsToUrl(*/}
                    {/*              imageFormat?.uri ?? ''*/}
                    {/*            )}" poster-color="transparent" ar-modes="webxr scene-viewer quick-look" auto-rotate="true" data-js-focus-visible="true" interaction-prompt="none" ar="true" ar-modes="webxr scene-viewer quick-look" camera-controls="true" ar-status="not-presenting"></model-viewer>`*/}
                    {/*          }}*/}
                    {/*        />*/}
                    {/*      ) : null}*/}
                    {/*    </div>*/}
                    {/*))}*/}
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
                {/*{formats*/}
                {/*  .sort((a, b) => sortMimeTypes.indexOf(a.mimeType) - sortMimeTypes.indexOf(b.mimeType))*/}
                {/*  .map((frmt) => (*/}
                {/*    <li*/}
                {/*      key={frmt.mimeType}*/}
                {/*      onClick={() => {*/}
                {/*        setMime(frmt.mimeType);*/}
                {/*      }}*/}
                {/*      className={`${frmt.mimeType === mime ? 'text-active' : 'text-inactive'} text-thin hover:opacity-80 cursor-pointer`}*/}
                {/*    >*/}
                {/*      {mimeFriendlyName(frmt.mimeType) ?? 'UNKNOWN'}*/}
                {/*    </li>*/}
                {/*  ))}*/}
              </ol>
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ItemToken;
