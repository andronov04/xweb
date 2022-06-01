import { useEffect, useState } from 'react';
import Loader from '../Utils/Loader';

interface ITextViewerProps {
  width?: number;
  height?: number;
  url: string;
}

export const TextViewer = ({ width, height, url }: ITextViewerProps) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((text) => setData(text));
  }, [url]);

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
