import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '../../../components/Utils/Loader';
import { useStore } from '../../../store';
import shallow from 'zustand/shallow';
import IframeEditor from '../../../components/Iframe/IframeEditor';
import { eventEmitter } from '../../../api/EventApi';
import { API_BUILD_TOKEN_URL, MOULDER_CMD_STATUS } from '../../../constants';
import { clearMsg, setMsg } from '../../../services/snackbar';
import { Logos } from '../../../components/Header/Header';
import { ItemLine } from '../../../components/Item/ItemLine';
import { CachePolicies, useFetch } from 'use-http';
import { UploadAssetFileResponse } from '../../../types/api';
import { UploadFileError } from '../../../types/error';

const SelectAsset = () => {
  const [asset, token] = useStore((state) => [state.asset, state.token], shallow);

  return (
    <div className={'max-w-4xl relative'}>
      <div>
        <div className={'pre-modal'}>
          {token.assets.map((asset) => (
            <ItemLine
              key={asset.id}
              item={asset as any}
              mode={'preview'}
              onSelect={() => {
                // setActive(!active);
              }}
              selected={true}
              onClickItem={(item) => {
                // TODO Remove previosly
                // token.addAsset(JSON.parse(JSON.stringify(item)) as any);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PreviewAsset = () => {
  const [ready, setReady] = useState(false);
  const [snapshot, setSnapshot] = useState<null | any>(null);
  const [asset, token] = useStore((state) => [state.asset, state.token], shallow);
  const router = useRouter();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const refContainer = useRef<HTMLDivElement | null>(null);
  const { data, loading, error, post } = useFetch<UploadAssetFileResponse | UploadFileError>(API_BUILD_TOKEN_URL, { cachePolicy: CachePolicies.NO_CACHE });

  useEffect(() => {
    if (!asset?.cid) {
      router.replace('/upload/asset').then();
    }

    if (refContainer.current) {
      const offset = 0;
      const rect = refContainer.current?.getBoundingClientRect();
      const height = window.innerHeight - rect.top - offset;
      const width = rect.width;
      setSize({ width, height });
    }
  }, []);

  if (!asset?.cid) {
    return <Loader />;
  }

  // available next or no
  useEffect(() => {
    // snapshot, setSnapshot
    eventEmitter.on(MOULDER_CMD_STATUS, (data) => {
      if (data.status === 'ready' && data.snapshot) {
        setSnapshot(data.snapshot);
      } else {
        setSnapshot(null);
      }
    });
  }, []);

  useEffect(() => {
    if (token.digest && token.state) {
      (async function () {
        await post(token.state.state);
      })();
    }
  }, [token.digest]);

  useEffect(() => {
    if (data) {
      setMsg({ clear: true, autoClose: 1000, title: 'Uploaded', kind: 'success' });
      token.setCid((data as UploadAssetFileResponse).cid);
      router.replace('/upload/asset/publish').then().catch();
    }
  }, [data]);

  return (
    <section>
      <header className={'flex w-full justify-center items-center p-5'}>
        <div className={'w-1/3'}>
          <Logos />
        </div>

        <div className={'w-1/3'}>{ready ? <SelectAsset /> : null}</div>

        <div className={'w-1/3 text-right space-x-2'}>
          <div className={` ${snapshot ? 'animate__pulse' : ''} pre_animate__pulse animate__animated`}>
            <Link href={'/upload/asset/publish'}>
              <a
                className={'select-none'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // if (!token.assets.length) {
                  //   setMsg({ title: 'You need to create a token', kind: 'error' });
                  //   return;
                  // }
                  // TODO Send now and message
                  setMsg({ autoClose: false, clear: true, block: true, title: 'Generate...', kind: 'info' });
                  token
                    .prepare(snapshot)
                    .then(() => {
                      setMsg({ autoClose: false, clear: true, block: true, title: 'Uploading...', kind: 'info' });
                    })
                    .catch(() => {
                      setMsg({ clear: true, title: 'Unknown error', kind: 'error' });
                    });
                }}
                href={'/upload/asset/publish'}
              >
                <CustomButton disabled={!snapshot} style={'white'} value={'Next step'} />
              </a>
            </Link>
          </div>
        </div>
      </header>

      <div ref={refContainer} className={'w-full h-full'}>
        {size.width && size.height && (
          <div
            style={{
              width: size.width,
              height: size.height
            }}
            className={'relative'}
          >
            <IframeEditor
              check={true}
              onLoad={() => {
                token.addAsset({
                  id: 0,
                  name: 'Preview',
                  // @ts-ignore
                  metadata: {
                    name: 'Preview',
                    artifactUri: `ipfs://${asset.cid}`
                  }
                });
                setReady(true);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
  // return (
  //   <section>
  //     <div className={'flex w-full justify-between items-center'}>
  //       <div className={'text-right'}>
  //         <i className={'font-thin text-sm opacity-90 text-warn'}>Warning: this is a test run, changes will not be saved!</i>
  //       </div>
  //
  //       <div className={'w-1/3 text-right space-x-2'}>
  //         <span className={'font-normal text-inactive text-sm'}>Details and publish</span>
  //         <Link href={'/upload/asset/publish'}>
  //           <a
  //             onClick={(e) => {
  //               e.preventDefault();
  //               e.stopPropagation();
  //               if (!snapshot) {
  //                 return;
  //               }
  //               setMsg({ autoClose: false, clear: true, block: true, title: 'Generate...', kind: 'info' });
  //               token
  //                 .prepare(snapshot)
  //                 .then(() => {
  //                   clearMsg();
  //                   router.push('/upload/asset/publish').then();
  //                   // setMsg({ autoClose: false, clear: true, block: true, title: 'Uploading...', kind: 'info' });
  //                 })
  //                 .catch(() => {
  //                   setMsg({ clear: true, title: 'Unknown error', kind: 'error' });
  //                 });
  //             }}
  //             href={'/upload/asset/publish'}
  //           >
  //             <CustomButton disabled={!snapshot} style={'white'} value={'Next step'} />
  //           </a>
  //         </Link>
  //       </div>
  //     </div>
  //
  //     <div ref={refContainer} className={'w-full h-full pt-4'}>
  //       {size.width && size.height && (
  //         <div
  //           style={{
  //             width: size.width,
  //             height: size.height
  //           }}
  //         >
  //           <IframeEditor
  //             check={true}
  //             onLoad={(e) => {
  //               token.addAsset({
  //                 id: 0,
  //                 name: 'Preview',
  //                 // @ts-ignore
  //                 metadata: {
  //                   name: 'Preview',
  //                   artifactUri: `ipfs://${asset.cid}?r=1`
  //                 }
  //               });
  //             }}
  //           />
  //         </div>
  //       )}
  //     </div>
  //
  //     <div id={'digest'} className={'pt-2 h-3 text-xs font-thin'}>
  //       {token.digest ?? 'hash'}
  //     </div>
  //   </section>
  // );
};

export default PreviewAsset;
