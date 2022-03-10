import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useContext, useEffect, useRef, useState } from 'react';
import IframeArt from './Iframe/Iframe';
import { XContext } from '../../providers/XProvider';
import { EDITOR_URL, MESSAGE_GENERATE_NEW, MESSAGE_SEND_ASSET } from '../../constants';
import CustomButton from '../../components/CustomButton/CustomButton';

const CreateArt = () => {
  const xContext = useContext(XContext);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const refContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (refContainer.current) {
      const offset = 50;
      const rect = refContainer.current?.getBoundingClientRect();
      const height = window.innerHeight - rect.top - offset;
      const width = rect.width;
      setSize({ width, height });
    }
  }, []);

  return (
    <section className={'h-full'}>
      <div className={'flex w-full justify-between items-center'}>
        <div className={'w-1/3'}>
          <Breadcrumbs />
        </div>

        <div className={'flex-grow text-center'}>
          <button
            onClick={() => {
              xContext.art?.proxy?.postMessage(
                {
                  type: MESSAGE_GENERATE_NEW,
                  data: {}
                },
                EDITOR_URL
              );
            }}
            className={'outline-0 hover:opacity-80 text-base cursor-pointer z-30 top-2 px-3 py-1 bg-dart2C rounded-sm'}
          >
            generate
          </button>
        </div>

        <div className={'w-1/3 text-right space-x-2'}>
          <span className={'font-thin text-inactive text-sm'}>details and mint</span>
          <CustomButton style={'white'} value={'next step'} />
        </div>
      </div>

      <div ref={refContainer} className={'w-full h-full pt-4'}>
        {size.width && size.height && (
          <div
            style={{
              width: size.width,
              height: size.height
            }}
          >
            <IframeArt />
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateArt;
