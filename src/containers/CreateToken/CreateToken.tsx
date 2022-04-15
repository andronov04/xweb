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
import { API_BUILD_TOKEN_URL } from '../../constants';
import { useRouter } from 'next/router';

const CreateToken = () => {
  const router = useRouter();
  const token = useStore((state) => state.token);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const refContainer = useRef<HTMLDivElement | null>(null);
  const { data, loading, error, post } = useFetch<UploadAssetFileResponse | UploadFileError>(API_BUILD_TOKEN_URL, { cachePolicy: CachePolicies.NO_CACHE });
  // TODO Handle errors
  useEffect(() => {
    if (data) {
      token.setCid((data as UploadAssetFileResponse).cid);
      router.replace('/create/token/mint').then().catch();
    }
  }, [data]);

  useEffect(() => {
    if (token.digest && token.state) {
      const state: any = token.state;
      state.assets = state.assets.map((a) => {
        const _asset = token.assets.find((asset) => asset.id === a.id);
        return {
          id: a.id,
          order: a.order,
          hash: a.data.hash,
          state: a.data.state,
          artifactUri: _asset?.metadata?.artifactUri
        };
      });
      (async function () {
        await post(state);
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
            className={'relative'}
          >
            {!token.assets.length ? (
              <div
                style={{
                  backgroundColor: 'rgba(0,0,0,0.6)'
                }}
                className={'w-full absolute h-full text-center flex items-center justify-center'}
              >
                <h2>
                  To get started, select
                  <br />
                  any of the asset below
                </h2>
              </div>
            ) : null}
            <IframeToken />
          </div>
        )}
      </div>

      {/*<div id={'digest'} className={'pt-2 h-3 text-xs font-thin'}>*/}
      {/*  {token.digest ?? 'hash'}*/}
      {/*</div>*/}

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
            const testUrl = 'http://localhost:3000/'; //'https://art3s.mypinata.cloud/ipfs/QmU3jrjyZFP83itaiuzqD7MuBZ4C8BgAGtR8CRT8J3mAfL';
            // Now only once
            let _item = JSON.parse(JSON.stringify(item));
            // _item.metadata.artifactUri = testUrl;
            // const _item = item;
            // Now delete all
            const isRemove = token.assets.map((a) => a.id).includes(_item.id);
            if (token.assets.length) {
              token.assets.forEach((ast) => {
                token.removeAsset(ast);
              });
            }
            if (!isRemove) {
              token.addAsset(_item as any);
            }
            // else if (token.assets.map((a) => a.id).includes(_item.id)) {
            //   token.removeAsset(_item);
            // } else {
            //   token.addAsset(_item);
            // }
          }}
          query={QL_GET_ASSET_ITEMS}
        />
      </div>
    </section>
  );
};

export default CreateToken;
