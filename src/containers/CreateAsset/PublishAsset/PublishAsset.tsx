import { useForm } from 'react-hook-form';
import Input from '../../../components/Form/Input';
import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';
import PreviewMedia from './PreviewMedia/PreviewMedia';
import { useRouter } from 'next/router';
import { useStore } from '../../../store';
import { useContract } from '../../../hooks/use-contract/useContract';
import { getWallet } from '../../../api/WalletApi';
import { MintAssetCallData } from '../../../types/contract';
import { strToByteStr } from '../../../utils/string';
import { IAssetMetadata } from '../../../types/metadata';
import { ipfsToUrl, urlToIpfs } from '../../../utils';
import { postDataFetch } from '../../../api/RestApi';
import { API_META_ASSET_URL } from '../../../constants';
import { clearMsg, setMsg } from '../../../services/snackbar';
import Waiting from '../../../components/Waiting/Waiting';
import ItemToken from '../../../components/Item/ItemToken';
import { setMetaFormats } from '../../../utils/mime';
import shallow from 'zustand/shallow';

const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 1000;

const PublishAsset = () => {
  const [opHash, setOpHash] = useState<string | null>();
  const [asset, token] = useStore((state) => [state.asset, state.token], shallow);
  const router = useRouter();
  // TODO Validation https://github.com/ianstormtaylor/superstruct one place for use backend and another
  const refSubmit = useRef<HTMLInputElement | null>(null);
  const [metaCid, setMetaCid] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const {
    call,
    state: { loading, status, result }
  } = useContract<MintAssetCallData>(getWallet().mintAsset);

  useEffect(() => {
    if (result) {
      // wait subscript in db
      setOpHash(result);
    }
  }, [result]);

  const getMetadata = (data: any = {}): IAssetMetadata => {
    const tags = (data.tags?.split(',') ?? []).filter((a) => a.length);
    let previewImage = asset.previews.find((a) => a.format === 'png'); //asset.previews[0];
    if (!previewImage) {
      previewImage = asset.previews.find((a) => a.format === 'jpeg' || a.format === 'jpg');
    }
    if (!previewImage) {
      throw 'No preview image';
    }

    return {
      name: data.name,
      isTransferable: false,
      description: data.description,
      tags: tags,
      date: new Date().toISOString(),
      artifactUri: `${urlToIpfs(asset.cid)}?hash=${asset.hash}`,
      displayUri: urlToIpfs(previewImage.cid),
      thumbnailUri: urlToIpfs(previewImage.cid),
      symbol: 'CNSST',
      decimals: 0,
      version: '0.1',
      type: 'Asset',
      formats: setMetaFormats(asset.previews, {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        cid: token.cid,
        hash: asset.hash
      })
    };
  };

  const onSubmit = async (data) => {
    const previewImage = asset.previews[0];

    if (!previewImage) {
      setMsg({ clear: true, title: 'You need set preview', kind: 'error' });
      return;
    }

    // Generate meta
    let metadataCid = metaCid;
    // TODO Get state preview
    if (!metaCid) {
      const metadata: IAssetMetadata = getMetadata(data);

      setMsg({ autoClose: false, title: 'Generate metadata...', kind: 'info' });
      const response = await postDataFetch(API_META_ASSET_URL, metadata);
      if (response.status !== 200) {
        setMsg({ clear: true, title: 'Unknown error', kind: 'error' });
        return; // TODO Error
      } else {
        setMsg({ clear: true, autoClose: 1000, title: 'Uploaded', kind: 'success' });
      }
      const result = await response.json();
      const { cid } = result;
      metadataCid = cid;
      setMetaCid(cid);
    }
    clearMsg();

    call({
      enabled: true,
      metadata: strToByteStr(`ipfs://${metadataCid}`),
      price: Math.floor((data.price ?? 0) * 1000000),
      royalties: Math.floor(data.royalties! * 10)
    });
  };

  useEffect(() => {
    // if (!asset?.cid) {
    //   router.replace('/create/asset/style');
    // }
  }, []);

  // if (!asset?.cid) {
  //   return <Loader />;
  // }

  return (
    <section className={'h-full'}>
      {opHash ? (
        <Waiting
          opHash={opHash}
          onSuccess={(action) => {
            router.replace(`/asset/${action.asset.slug}`).then();
          }}
        />
      ) : null}
      <div className={'flex gap-x-3'}>
        <div className={'w-1/2'}>
          <form className={'flex gap-y-3 flex-col'} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={'Name'}
              placeholder={'Name (max 36 characters)'}
              register={register('name', {
                required: { message: 'Required name', value: true },
                minLength: { message: 'Name min length 3', value: 3 },
                maxLength: { message: 'Name max length 36', value: 36 }
              })}
            />
            <Input
              type={'textarea'}
              placeholder={'Description (max 512 characters)'}
              label={'Description'}
              register={register('description', {
                maxLength: { message: 'Description max length 512', value: 512 },
                required: false,
                minLength: { message: 'Description min length 0', value: 0 }
              })}
            />
            <Input
              label={'Tags'}
              placeholder={'Tags (comma separated)'}
              register={register('tags', {
                maxLength: { message: 'Tags max length 108', value: 108 }
              })}
            />

            <div className={'w-full gap-x-3 flex justify-start text-left mt-4'}>
              <div className={'w-1/2'}>
                <Input
                  label={'Royalties'}
                  type={'number'}
                  min={0}
                  max={20}
                  defaultValue={0}
                  placeholder={'Royalties (0-20%)'}
                  register={register('royalties', {
                    min: 0,
                    max: 20,
                    required: { message: 'Required royalties', value: true },
                    valueAsNumber: true
                  })}
                />
              </div>
            </div>
            <input ref={refSubmit} className={'hidden'} type="submit" />
          </form>
        </div>

        <div style={{ flex: '1 0' }} className={'w-1/2 flex flex-col flex-grow'}>
          <div
            style={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative'
            }}
          >
            <div className={'absolute top-0 left-0 w-full h-full'}>
              <div>
                <ItemToken
                  formats={true}
                  item={{
                    id: -1,
                    name: '',
                    width: DEFAULT_WIDTH,
                    height: DEFAULT_HEIGHT,
                    metadata: getMetadata()
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/*<div className={'w-1/2'}>*/}
        {/*  <div className={'p-4'}>*/}
        {/*    <PreviewMedia*/}
        {/*      width={DEFAULT_WIDTH}*/}
        {/*      height={DEFAULT_HEIGHT}*/}
        {/*      url={`${ipfsToUrl(urlToIpfs(asset.cid))}?hash=`}*/}
        {/*      onPreview={(data) => {*/}
        {/*        asset.addPreview(data);*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className={'flex justify-end items-center space-x-2'}>
        <CustomButton
          onClick={() => {
            if (Object.keys(errors).length) {
              const desc = Object.values(errors)
                .filter((a) => a.message)
                .map((a) => a.message)
                .join('. ');
              setMsg({ autoClose: 3000, clear: true, title: 'Form error', description: desc, kind: 'error' });
            }
            refSubmit.current?.click();
          }}
          style={'white'}
          value={'Publish'}
        />
      </div>
    </section>
  );
};

export default PublishAsset;
