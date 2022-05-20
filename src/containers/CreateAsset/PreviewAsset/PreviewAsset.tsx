import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '../../../components/Utils/Loader';
import { useStore } from '../../../store';
import shallow from 'zustand/shallow';
import IframeEditor from '../../../components/Iframe/IframeEditor';
import { eventEmitter } from '../../../api/EventApi';
import { MOULDER_CMD_STATUS } from '../../../constants';
import { clearMsg, setMsg } from '../../../services/snackbar';

const PreviewAsset = () => {
  const [snapshot, setSnapshot] = useState<null | any>(null);
  const [asset, token] = useStore((state) => [state.asset, state.token], shallow);
  const router = useRouter();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const refContainer = useRef<HTMLDivElement | null>(null);

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

  return (
    <section>
      <div className={'flex w-full justify-between items-center'}>
        <div className={'text-right'}>
          <i className={'font-thin text-sm opacity-90 text-warn'}>Warning: this is a test run, changes will not be saved!</i>
        </div>

        <div className={'w-1/3 text-right space-x-2'}>
          <span className={'font-normal text-inactive text-sm'}>Details and publish</span>
          <Link href={'/upload/asset/publish'}>
            <a
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!snapshot) {
                  return;
                }
                setMsg({ autoClose: false, clear: true, block: true, title: 'Generate...', kind: 'info' });
                token
                  .prepare(snapshot)
                  .then(() => {
                    clearMsg();
                    router.push('/upload/asset/publish').then();
                    // setMsg({ autoClose: false, clear: true, block: true, title: 'Uploading...', kind: 'info' });
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
                    artifactUri: `ipfs://${asset.cid}?r=1`
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
