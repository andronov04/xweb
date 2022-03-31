import { useForm } from 'react-hook-form';
import Input from '../../../components/Form/Input';
import { useEffect, useRef, useState } from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';
import PreviewMedia from './PreviewMedia/PreviewMedia';
import Loader from '../../../components/Utils/Loader';
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
import { setMsg } from '../../../services/snackbar';
import { useSubscription } from '@apollo/client';
import Subscription from '../../../components/Subscription/Subscription';
import { SUB_ACTION_OP_HASH } from 'src/api/subscription';

const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 1000;

const PublishStyle = () => {
  const [opHash, setOpHash] = useState<string | null>();
  const asset = useStore((state) => state.asset);
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
  console.log('useContract:::', loading, status);

  // useEffect(() => {
  //   // wait subscript in db
  //   console.log('!data:::', data);
  // }, [data]);

  useEffect(() => {
    console.log('result', result);
    if (result) {
      setMsg({ title: 'Waiting confirmation...', kind: 'info' });
      // wait subscript in db
      setOpHash(result);
    }
  }, [result]);

  const onSubmit = async (data) => {
    console.log('data:::', data);
    const previewImage = asset.previews[0];

    if (!previewImage) {
      setMsg({ title: 'You need set preview', kind: 'error' });
      return;
    }

    // Generate meta
    let metadataCid = metaCid;
    // TODO Get state preview
    if (!metaCid) {
      const tags = (data.tags?.split(',') ?? []).filter((a) => a.length);
      const metadata: IAssetMetadata = {
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
        type: 'Asset (Style)',
        formats: [
          {
            uri: urlToIpfs(previewImage.cid),
            hash: asset.hash,
            mimeType: 'image/png',
            dimensions: {
              value: `${DEFAULT_WIDTH}x${DEFAULT_HEIGHT}`,
              unit: 'px'
            }
          },
          {
            uri: `${urlToIpfs(asset.cid)}?hash=${asset.hash}`,
            hash: asset.hash,
            mimeType: 'text/html'
          }
        ]
      };

      setMsg({ title: 'Generate metadata...', kind: 'info' });
      // console.log('metadata', metadata);
      const response = await postDataFetch(API_META_ASSET_URL, metadata);
      if (response.status !== 200) {
        setMsg({ title: 'Unknown error', kind: 'error' });
        return; // TODO Error
      }
      const result = await response.json();
      const { cid } = result;
      metadataCid = cid;
      console.log('metadata:::', metadata);
      setMetaCid(cid);
    }

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
        <Subscription
          query={SUB_ACTION_OP_HASH}
          variables={{ opHash: opHash }}
          onComplete={(data) => {
            console.log('onComplete:::', data);
            // TODO Timeout
            const action = data?.action?.[0];
            if (action) {
              router.replace(`/asset/${action.asset.slug}`).then();
            }
          }}
        />
      ) : null}
      <div className={'flex gap-x-3'}>
        <div className={'w-1/2'}>
          <form className={'flex gap-y-3 flex-col'} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={'Name'}
              placeholder={'Name (max 280 characters)'}
              register={register('name', {
                required: { message: 'Required name', value: true },
                minLength: { message: 'Name min length 3', value: 3 },
                maxLength: { message: 'Name max length 280', value: 280 }
              })}
            />
            <Input
              type={'textarea'}
              placeholder={'Description (max 2048 characters)'}
              label={'Description'}
              register={register('description', {
                maxLength: { message: 'Description max length 2048', value: 2048 },
                required: { message: 'Required description', value: true },
                minLength: { message: 'Description min length 12', value: 12 }
              })}
            />
            <Input
              label={'Tags'}
              placeholder={'Tags (comma separated)'}
              register={register('tags', {
                maxLength: { message: 'Tags max length 512', value: 512 }
              })}
            />

            <div className={'w-full gap-x-3 flex justify-start text-left mt-4'}>
              <div className={'w-1/2'}>
                <Input
                  label={'Royalties'}
                  type={'number'}
                  defaultValue={0}
                  placeholder={'royalties (0-25%)'}
                  register={register('royalties', {
                    min: 0,
                    max: 25,
                    required: { message: 'Required royalties', value: true },
                    valueAsNumber: true
                  })}
                />
              </div>
              <div className={'w-1/2'}>
                <Input
                  label={'Extended Price'}
                  type={'number'}
                  defaultValue={0}
                  placeholder={'ꜩ (0-9999)'}
                  register={register('price', {
                    min: 0,
                    max: Infinity,
                    required: { message: 'Required extended price', value: true },
                    valueAsNumber: true
                  })}
                />
              </div>
            </div>
            <input ref={refSubmit} className={'hidden'} type="submit" />
          </form>
        </div>
        <div className={'w-1/2'}>
          <div className={'p-4'}>
            <PreviewMedia
              width={DEFAULT_WIDTH}
              height={DEFAULT_HEIGHT}
              url={`${ipfsToUrl(urlToIpfs(asset.cid))}?hash=`}
              onPreview={(cid, hash) => {
                asset.addPreview(cid, hash);
              }}
            />
          </div>
        </div>
      </div>
      <div className={'flex justify-end items-center space-x-2'}>
        <i className={'font-thin text-sm opacity-90 text-warn'}>warning: edit is not available in beta version</i>
        <CustomButton
          onClick={() => {
            if (Object.keys(errors).length) {
              const desc = Object.values(errors)
                .filter((a) => a.message)
                .map((a) => a.message)
                .join('. ');
              setMsg({ title: 'Form error', description: desc, kind: 'error' });
            }
            refSubmit.current?.click();
          }}
          style={'white'}
          value={'publish'}
        />
      </div>
    </section>
  );
};

export default PublishStyle;
