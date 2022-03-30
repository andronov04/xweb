import { useForm } from 'react-hook-form';
import Input from '../../../components/Form/Input';
import { useEffect, useRef } from 'react';
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

const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 1000;
const DEFAULT_HASH = 'x019Fb5Df875F0FAfEb7FB31FA32cBeDaEA84ADdceAac0EE3e5859e';

const PublishStyle = () => {
  const asset = useStore((state) => state.asset);
  const router = useRouter();
  // TODO Validation https://github.com/ianstormtaylor/superstruct one place for use backend and another
  const refSubmit = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const {
    call,
    state: { loading, status, result: hash }
  } = useContract<MintAssetCallData>(getWallet().mintAsset);
  console.log('useContract:::', loading, status);

  // useEffect(())
  const onSubmit = async (data) => {
    const previewImage = asset.previews[0];

    // Generate meta
    const tags = (data.tags?.split(',') ?? []).filter((a) => a.length);
    const metadata: IAssetMetadata = {
      name: data.name,
      description: data.description,
      tags: tags,
      artifactUri: `${urlToIpfs(asset.cid)}?xhash=${asset.hash}`,
      displayUri: urlToIpfs(previewImage),
      thumbnailUri: urlToIpfs(previewImage),
      symbol: 'AASSET',
      decimals: 0,
      version: '0.1'
    };

    // console.log('metadata', metadata);
    const response = await postDataFetch(API_META_ASSET_URL, metadata);
    if (response.status !== 200) {
      return; // TODO Error
    }
    const result = await response.json();
    const { cid: metadataCid } = result;

    call({
      enabled: true,
      metadata: strToByteStr(`ipfs://${metadataCid}`),
      min_price: Math.floor((data.min_price ?? 0) * 1000000),
      royalties: Math.floor(data.royalties! * 10)
    });
    console.log('publish', data);
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
      <div className={'flex gap-x-3'}>
        <div className={'w-1/2'}>
          <form className={'flex gap-y-3 flex-col'} onSubmit={handleSubmit(onSubmit)}>
            {errors.name && <p>name is required.</p>}
            {errors.royalties && <p>royalties error.</p>}
            <Input label={'Name'} placeholder={'Name (max 280 characters)'} register={register('name', { required: true, minLength: 3, maxLength: 280 })} />
            <Input
              type={'textarea'}
              placeholder={'Description (max 2048 characters)'}
              label={'Description'}
              register={register('description', { maxLength: 2048, required: true, minLength: 80 })}
            />
            <Input label={'Tags'} placeholder={'Tags (comma separated)'} register={register('tags', { maxLength: 512 })} />

            <div className={'w-full gap-x-3 flex justify-start text-left mt-4'}>
              <div className={'w-1/2'}>
                <Input
                  label={'Royalties'}
                  type={'number'}
                  // defaultValue={null}
                  placeholder={'royalties (0-25%)'}
                  register={register('royalties', { min: 0, max: 25, required: true, valueAsNumber: true })}
                />
              </div>
              <div className={'w-1/2'}>
                <Input
                  label={'Extended Price'}
                  type={'number'}
                  // defaultValue={null}
                  placeholder={'ꜩ (0-9999)'}
                  register={register('price', { min: 0, max: Infinity, required: false, valueAsNumber: true })}
                />
              </div>
            </div>
            <input ref={refSubmit} className={'hidden'} type="submit" />
          </form>
        </div>
        <div className={'w-1/2'}>
          <div className={'p-4'}>
            <PreviewMedia width={DEFAULT_WIDTH} height={DEFAULT_HEIGHT} url={`${ipfsToUrl(urlToIpfs(asset.cid))}?hash=${DEFAULT_HASH}`} />
          </div>
        </div>
      </div>
      <div className={'flex justify-end items-center space-x-2'}>
        <i className={'font-thin text-sm opacity-90 text-warn'}>warning: edit is not available in beta version</i>
        <CustomButton
          onClick={() => {
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
