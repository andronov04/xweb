import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '../../../components/Utils/Loader';
import { useStore } from '../../../store';
import shallow from 'zustand/shallow';
import IframeEditor from '../../../components/Iframe/IframeEditor';

const PreviewAsset = () => {
  const [asset, token] = useStore((state) => [state.asset, state.token], shallow);
  const router = useRouter();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const refContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // TODO Remove timeout?
    if (size.width && size.height) {
      // setTimeout(() => {
      //   token.addAsset({
      //     id: 0,
      //     name: 'Style',
      //     // @ts-ignore
      //     metadata: {
      //       name: 'Style',
      //       artifactUri: `ipfs://${asset.cid}`
      //     }
      //   });
      // }, 500);
    }
  }, [size.width, size.height]);

  useEffect(() => {
    if (!asset?.cid) {
      router.replace('/upload/asset');
    }

    if (refContainer.current) {
      const offset = 50;
      const rect = refContainer.current?.getBoundingClientRect();
      const height = window.innerHeight - rect.top - offset;
      const width = rect.width;
      setSize({ width, height });
    }
  }, []);

  if (!asset?.cid) {
    return <Loader />;
  }

  return (
    <section>
      <div className={'flex w-full justify-between items-center'}>
        <div className={'text-right'}>
          <i className={'font-thin text-sm opacity-90 text-warn'}>Warning: this is a test run, changes will not be saved!</i>
        </div>

        <div className={'w-1/3 text-right space-x-2'}>
          <span className={'font-normal text-inactive text-sm'}>Details and publish</span>
          <Link href={'/upload/asset/publish'}>
            <a href={'/upload/asset/publish'}>
              <CustomButton style={'white'} value={'Next step'} />
            </a>
          </Link>
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
            <IframeEditor
              check={true}
              onLoad={(e) => {
                token.addAsset({
                  id: 0,
                  name: 'Preview',
                  // @ts-ignore
                  metadata: {
                    name: 'Preview',
                    artifactUri: `ipfs://${asset.cid}`
                  }
                });
              }}
            />
          </div>
        )}
      </div>

      <div id={'digest'} className={'pt-2 h-3 text-xs font-thin'}>
        {token.digest ?? 'hash'}
      </div>
    </section>
  );
};

export default PreviewAsset;
