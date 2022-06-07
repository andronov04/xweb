import { useEffect, useState } from 'react';
import Loader from '../Utils/Loader';
import { IMetaFormat } from '../../types/metadata';
import { ipfsToUrl } from '../../utils';

interface ISvgViewerProps {
  width?: number;
  height?: number;
  formats: IMetaFormat[];
}

export const SVGViewer = ({ width, height, formats }: ISvgViewerProps) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    if (formats.length) {
      fetch(ipfsToUrl(formats[0].uri))
        .then((response) => response.text())
        .then((text) => setData(text));
    }
  }, [formats]);

  return (
    <div style={{ width, height }}>
      {!data ? (
        <div className={'absolute z-20 w-full h-full'}>
          <div className={'w-full h-full bg-black absolute z-10 opacity-60'} />
          <div className={'absolute z-20 w-full h-full'}>
            <Loader />
          </div>
        </div>
      ) : null}
      {data ? <div dangerouslySetInnerHTML={{ __html: data }} /> : null}
    </div>
  );
};
