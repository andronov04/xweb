import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useContext, useEffect, useRef, useState } from 'react';
import IframeArt from './Iframe/Iframe';
import { XContext } from '../../providers/XProvider';
import CustomButton from '../../components/CustomButton/CustomButton';
import Items from '../../components/Items/Items';
import { QL_GET_ASSET_ITEMS } from '../../api/queries';

const CreateArt = () => {
  const [assets, setAssets] = useState<any[]>([]); // TODO Set interface
  const xContext = useContext(XContext);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const refContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    xContext.art?.setAssets(assets);
  }, [assets]);

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
          <Breadcrumbs
            navs={[
              {
                name: 'Editor',
                active: false
              },
              {
                name: 'Your Art',
                active: true
              },
              {
                name: assets?.[0]?.name ?? '',
                active: false
              }
            ]}
          />
        </div>

        <div className={'flex-grow text-center'}>
          <button
            onClick={() => {
              xContext.art?.generate();
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

      <div id={'digest'} className={'pt-2 h-3 text-xs font-thin'}>
        {/*{xContext.art?.digest ?? 'hash'}*/}
      </div>

      <div>
        <div className={'flex my-5 font-thin gap-x-4'}>
          <p className={'text-whitegrey'}>all assets*</p>
          <p className={'text-active'}>styles</p>
          <p className={'text-whitegrey'}>
            in beta version, you can select only one style, <b className={'hover:opacity-80 cursor-pointer text-inactive'}>learn more</b>
          </p>
        </div>
        <Items
          kind={'asset'}
          mode={'selected'}
          activeIds={assets.map((a) => a.id)}
          onClickItem={(item) => {
            // Now only once
            if (assets.includes(item)) {
              setAssets([]);
            } else {
              setAssets([item]);
            }
          }}
          query={QL_GET_ASSET_ITEMS}
        />
      </div>
    </section>
  );
};

export default CreateArt;
