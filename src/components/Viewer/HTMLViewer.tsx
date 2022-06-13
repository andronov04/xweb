import { IMetaFormat } from '../../types/metadata';
import { ipfsToUrl } from '../../utils';
import IframeToken from '../Iframe/IframeToken';

interface IHTMLViewer {
  width?: number;
  height?: number;
  formats: IMetaFormat[];
}

export const HTMLViewer = ({ width, height, formats }: IHTMLViewer) => {
  return (
    <div style={{ width, height }}>
      {formats.map((fr) => (
        <IframeToken key={fr.mimeType} url={ipfsToUrl(fr.uri ?? '')} width={width ?? 0} height={height ?? 0} />
      ))}
    </div>
  );
};
