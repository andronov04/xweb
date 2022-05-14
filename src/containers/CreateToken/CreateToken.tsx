import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import Items from '../../components/Items/Items';
import { QL_GET_ASSET_ITEMS_BY_IDS, QL_GET_ASSET_ITEMS_BY_NOT_IDS_AND_FLAG } from '../../api/queries';
import { useStore } from '../../store';
import Link from 'next/link';
import { setMsg } from '../../services/snackbar';
import { CachePolicies, useFetch } from 'use-http';
import { UploadAssetFileResponse } from '../../types/api';
import { UploadFileError } from '../../types/error';
import { API_BUILD_TOKEN_URL } from '../../constants';
import { useRouter } from 'next/router';
import { IAssetFlag } from '../../types';
import IframeEditor from '../../components/Iframe/IframeEditor';
import { Logos } from '../../components/Header/Header';

const MIN_HEIGHT = 600;

const CreateToken = () => {
  const router = useRouter();
  const token = useStore((state) => state.token);
  const [assetIds, setAssetIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [mountAsset, setMountAsset] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0, top: 0 });
  const refContainer = useRef<HTMLDivElement | null>(null);
  const { data, loading, error, post } = useFetch<UploadAssetFileResponse | UploadFileError>(API_BUILD_TOKEN_URL, { cachePolicy: CachePolicies.NO_CACHE });
  // TODO Handle errors
  useEffect(() => {
    if (data) {
      setMsg({ clear: true, autoClose: 1000, title: 'Uploaded', kind: 'success' });
      token.setCid((data as UploadAssetFileResponse).cid);
      router.replace('/create/token/mint').then().catch();
    }
  }, [data]);

  // if from asset
  useEffect(() => {
    if (router.query?.a && size.width && size.height && token.isProxy) {
      const assets = (router.query?.a as string).split(',');
      router.replace('/create/token', undefined, { shallow: true }).then();
      setAssetIds(assets.map((a) => parseInt(a)).slice(0, 1));
    }
  }, [router, size, token]);

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
      const offset = 100;
      const rectCont = refContainer.current?.getBoundingClientRect();
      let top = rectCont.top ?? 0;
      let rect = {
        top: rectCont.top,
        width: window.innerWidth
      };
      let height = window.innerHeight - rect.top - offset;
      height = height < MIN_HEIGHT ? MIN_HEIGHT : height;
      const width = rect.width;
      console.log('width, height ', width, height);
      setSize({ width, height, top });
    }
  }, []);

  return (
    <section ref={refContainer}>
      <div>
        <div className={'flex w-full justify-between items-center p-5'}>
          <div>
            <Logos />
          </div>
          <div className={'w-1/3 text-right space-x-2'}>
            <span className={'font-normal text-inactive text-sm'}>Details and mint</span>
            <Link href={'/create/token/mint'}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // if (!token.assets.length) {
                  //   setMsg({ title: 'You need to create a token', kind: 'error' });
                  //   return;
                  // }
                  // // TODO Send now and message
                  // setMsg({ autoClose: false, clear: true, block: true, title: 'Generate metadata...', kind: 'info' });
                  // token
                  //   .prepare()
                  //   .then(() => {
                  //     setMsg({ autoClose: false, clear: true, block: true, title: 'Uploading...', kind: 'info' });
                  //   })
                  //   .catch(() => {
                  //     setMsg({ clear: true, title: 'Unknown error', kind: 'error' });
                  //   });
                }}
                href={'/create/token/mint'}
              >
                <CustomButton disabled={true} style={'white'} value={'Next step'} />
              </a>
            </Link>
          </div>
        </div>

        <div ref={refContainer} className={'w-full h-full'}>
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
                  className={'w-full z-30 absolute h-full text-center flex items-center justify-center'}
                >
                  <h2>
                    To get started, select
                    <br />
                    any of the asset below
                  </h2>
                </div>
              ) : null}
              <IframeEditor
                onLoad={() => {
                  setReady(true);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className={'p-5'}>
        <div className={'flex my-5 gap-x-4'}>
          <p className={'text-active text-lg'}>Assets</p>
        </div>
        {assetIds.length && ready ? (
          <Items
            key={'exist'}
            kind={'asset'}
            mode={'selected'}
            // activeIds={assetIds}
            activeIds={token.assets.map((a) => a.id)}
            onMountItem={(item) => {
              if (!token.assets.length && !mountAsset) {
                token.addAsset(JSON.parse(JSON.stringify(item)) as any);
                setMountAsset(true);
              }
            }}
            onClickItem={(item) => {
              let _item = JSON.parse(JSON.stringify(item));
              const isRemove = token.assets.map((a) => a.id).includes(_item.id);
              if (token.assets.length) {
                token.assets.forEach((ast) => {
                  token.removeAsset(ast);
                });
              }
              if (!isRemove) {
                token.addAsset(_item as any);
              }
            }}
            variables={{
              ids: assetIds
            }}
            query={QL_GET_ASSET_ITEMS_BY_IDS}
          />
        ) : null}
        {ready ? (
          <Items
            key={'next'}
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
            }}
            variables={{
              ids: assetIds,
              flag: IAssetFlag.NONE
            }}
            query={QL_GET_ASSET_ITEMS_BY_NOT_IDS_AND_FLAG}
          />
        ) : null}
      </div>
    </section>
  );
};

export default CreateToken;
