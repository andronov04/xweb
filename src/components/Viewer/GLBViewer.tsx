import { IMetaFormat } from '../../types/metadata';
import { ipfsToUrl } from '../../utils';

interface IGLBViewerProps {
  width?: number;
  height?: number;
  formats: IMetaFormat[];
  image?: IMetaFormat;
}

export const GLBViewer = ({ width, height, formats, image }: IGLBViewerProps) => {
  // TODO Set poster
  return (
    <div style={{ width, height }}>
      <div
        className={'w-full h-full pre-model-viewer'}
        dangerouslySetInnerHTML={{
          __html: `<model-viewer alt="3D Model" src="${ipfsToUrl(formats[0].uri ?? '')}" poster="${ipfsToUrl(
            image?.uri ?? ''
          )}" style="background-color: unset;" exposure="0.5" poster="" poster-color="transparent" ar-modes="webxr scene-viewer quick-look" auto-rotate="true" data-js-focus-visible="true" interaction-prompt="none" ar="true" ar-modes="webxr scene-viewer quick-look" camera-controls="true" ar-status="not-presenting"></model-viewer>`
        }}
      />
    </div>
  );
};
