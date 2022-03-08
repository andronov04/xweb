import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useEffect, useRef, useState } from 'react';

const CreateArt = () => {
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
      <div>
        <Breadcrumbs />
      </div>

      <div ref={refContainer} className={'w-full h-full pt-4'}>
        {size.width && size.height && (
          <div
            style={{
              width: size.width,
              height: size.height
            }}
          >
            <iframe width={'100%'} height={'100%'} src={'https://xeditor-dun.vercel.app/'} className={'iframe'} sandbox={'allow-same-origin allow-scripts'} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateArt;
