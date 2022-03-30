import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useEffect, useRef, useState } from 'react';
import IframeToken from './Iframe/Iframe';
import CustomButton from '../../components/CustomButton/CustomButton';
import Items from '../../components/Items/Items';
import { QL_GET_ASSET_ITEMS } from '../../api/queries';
import { useStore } from '../../store';
import Link from 'next/link';
import { setMsg } from '../../services/snackbar';
import { CachePolicies, useFetch } from 'use-http';
import { UploadAssetFileResponse } from '../../types/api';
import { UploadFileError } from '../../types/error';
import { API_META_TOKEN_URL } from '../../constants';
import { useRouter } from 'next/router';

const CreateToken = () => {
  const router = useRouter();
  const token = useStore((state) => state.token);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const refContainer = useRef<HTMLDivElement | null>(null);
  const { data, loading, error, post } = useFetch<UploadAssetFileResponse | UploadFileError>(API_META_TOKEN_URL, { cachePolicy: CachePolicies.NO_CACHE });
  // TODO Handle errors
  useEffect(() => {
    if (data) {
      token.setCid((data as UploadAssetFileResponse).cid);
      router.replace('/create/token/mint').then().catch();
    }
  }, [data]);

  useEffect(() => {
    if (token.digest && token.state) {
      console.log('token:::', token);
      const testToken = {
        token: {
          width: 500,
          height: 500,
          assets: [
            {
              asset: {
                id: 1,
                name: 'Suprematism',
                metadata: {
                  name: 'Suprematism',
                  artifactUri: 'ipfs://QmZv7s9cvqrDX5cWQbAzmQ4V1p6Pjk3CAvjRZEM8pKNnVS?hash=x01C6f78F75763cBDBeEAE62F0f89E9847461aC4fccB03C4CC8BF9F'
                }
              },
              state: {},
              order: 1,
              iframe: null
            }
          ]
        }
      };
      (async function () {
        await post(testToken);
      })();
    }
  }, [token.digest]);

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
                name: 'Your Token',
                active: true
              },
              {
                name: token.assets?.[0]?.name ?? '',
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
          {/*  generate*/}
          {/*</button>*/}
        </div>

        <div className={'w-1/3 text-right space-x-2'}>
          <span className={'font-thin text-inactive text-sm'}>details and mint</span>
          <Link href={'/create/token/mint'}>
            <a
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!token.assets.length) {
                  setMsg({ title: 'You need to create a token', kind: 'error' });
                  return;
                }
                // TODO Send now and message
                setMsg({ title: 'Generate metadata...', kind: 'info' });
                token
                  .prepare()
                  .then(() => {
                    setMsg({ title: 'Upload to ipfs...', kind: 'info' });
                  })
                  .catch(() => {
                    setMsg({ title: 'Unknown error', kind: 'error' });
                  });
              }}
              href={'/create/token/mint'}
            >
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
        {token.digest ?? 'hash'}
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
          activeIds={token.assets.map((a) => a.id)}
          onClickItem={(item) => {
            const testUrl = 'http://localhost:8001/'; //'https://art3s.mypinata.cloud/ipfs/QmU3jrjyZFP83itaiuzqD7MuBZ4C8BgAGtR8CRT8J3mAfL';
            // Now only once
            let _item = JSON.parse(JSON.stringify(item));
            _item.metadata.artifactUri = testUrl;
            if (token.assets.map((a) => a.id).includes(_item.id)) {
              token.removeAsset(_item);
            } else {
              token.addAsset(_item);
            }
          }}
          query={QL_GET_ASSET_ITEMS}
        />
      </div>
    </section>
  );
};

export default CreateToken;
