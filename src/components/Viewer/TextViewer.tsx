import { useState } from 'react';
import Loader from '../Utils/Loader';
import { IMetaFormat } from '../../types/metadata';
import { ipfsToUrl, s3ToUrl } from '../../utils';
import { useAsync } from 'react-async-hook';

interface ITextViewerProps {
  width?: number;
  height?: number;
  formats: IMetaFormat[];
}

export const TextViewer = ({ width, height, formats }: ITextViewerProps) => {
  const [data, setData] = useState<string | null>(null);

  useAsync(async () => {
    if (formats.length) {
      let resp = await fetch(s3ToUrl(formats[0].uri));
      if (resp.status !== 200) {
        resp = await fetch(ipfsToUrl(formats[0].uri));
      }
      const text = await resp.text();
      setData(text);
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
      {data ? <div className={'whitespace-pre-wrap'} dangerouslySetInnerHTML={{ __html: data }} /> : null}
    </div>
  );
};
