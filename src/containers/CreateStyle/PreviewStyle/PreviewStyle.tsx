import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';
import IframeToken from '../../CreateToken/Iframe/Iframe';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '../../../components/Utils/Loader';
import { useStore } from '../../../store';
import shallow from 'zustand/shallow';

const PreviewStyle = () => {
  const [asset, art] = useStore((state) => [state.asset, state.token], shallow);
  const router = useRouter();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const refContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const url = 'ipfs://QmVRhsPuMpWDhLUCh87Uwt1kUkuAJ3eYDQYi2oBU4zGYK6';
    setTimeout(() => {
      // art.setAssets([
      //   {
      //     id: 0,
      //     name: 'Style',
      //     metadata: {
      //       name: 'Style',
      //       artifactUri: url
      //     }
      //   }
      // ]);
    }, 1500);
  }, []);

  useEffect(() => {
    if (!asset?.cid) {
      router.replace('/create/asset/style');
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
    <section className={'h-full'}>
      <div className={'flex w-full justify-between items-center'}>
        <div className={'w-1/3'}>
          <Breadcrumbs
            navs={[
              {
                name: 'Assets',
                active: false
              },
              {
                name: 'Your Art',
                active: true
              },
              {
                name: 'Uploaded',
                active: false
              },
              {
                name: 'Preview',
                active: false
              }
            ]}
          />
        </div>

        <div className={'flex-grow text-center'}>
          {/*<button*/}
          {/*  onClick={() => {*/}
          {/*    art.generate();*/}
          {/*  }}*/}
          {/*  className={'outline-0 hover:opacity-80 text-base cursor-pointer z-30 top-2 px-3 py-1 bg-dart2C rounded-sm'}*/}
          {/*>*/}
          {/*  generate new*/}
          {/*</button>*/}
        </div>

        <div className={'w-1/3 text-right space-x-2'}>
          <span className={'font-thin text-inactive text-sm'}>details and publish</span>
          <Link href={'/create/asset/style/publish'}>
            <a href={'/create/asset/style/publish'}>
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
            <IframeToken />
          </div>
        )}
      </div>

      <div id={'digest'} className={'pt-2 h-3 text-xs font-thin'}>
        {art.digest ?? 'hash'}
      </div>
    </section>
  );
};

export default PreviewStyle;
