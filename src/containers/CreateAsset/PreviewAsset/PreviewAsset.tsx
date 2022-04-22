import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';
import IframeToken from '../../CreateToken/Iframe/Iframe';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '../../../components/Utils/Loader';
import { useStore } from '../../../store';
import shallow from 'zustand/shallow';

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
      router.replace('/create/asset');
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
          <i className={'font-thin text-sm opacity-90 text-warn'}>Warning: This is just a check, no state changes in your asset. </i>
        </div>

        <div className={'w-1/3 text-right space-x-2'}>
          <span className={'font-thin text-inactive text-sm'}>details and publish</span>
          <Link href={'/create/asset/publish'}>
            <a href={'/create/asset/publish'}>
              <CustomButton style={'white'} value={'next step'} />
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
            <IframeToken
              check={true}
              onLoad={(e) => {
                token.addAsset({
                  id: 0,
                  name: 'Asset',
                  // @ts-ignore
                  metadata: {
                    name: 'Asset',
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
