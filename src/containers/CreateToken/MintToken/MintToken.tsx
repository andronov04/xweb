import { useForm } from 'react-hook-form';
import { useStore } from '../../../store';
import Input from '../../../components/Form/Input';
import { useRef } from 'react';
import { ipfsToUrl, urlToIpfs } from '../../../utils';
import PreviewToken from './PreviewToken/PreviewToken';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useContract } from '../../../hooks/use-contract/useContract';
import { MintTokenCallData } from '../../../types/contract';
import { getWallet } from '../../../api/WalletApi';
import { ITokenMetadata } from '../../../types/metadata';
import { postDataFetch } from '../../../api/RestApi';
import { API_META_TOKEN_URL } from '../../../constants';
import { strToByteStr } from '../../../utils/string';
import { setMsg } from '../../../services/snackbar';

const MintToken = () => {
  const token = useStore((state) => state.token);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const refSubmit = useRef<HTMLInputElement | null>(null);
  const {
    call,
    state: { loading, status, result: hash }
  } = useContract<MintTokenCallData>(getWallet().mintToken);
  console.log('useContract:::', loading, status);

  const onSubmit = async (data) => {
    // TODO GENERATE PREVIEW
    // Generate meta
    const tags = (data.tags?.split(',') ?? []).filter((a) => a.length);
    const metadata: ITokenMetadata = {
      name: data.name,
      description: data.description,
      tags: tags,
      artifactUri: `${urlToIpfs(token.cid)}`,
      displayUri: urlToIpfs('previewImage'),
      thumbnailUri: urlToIpfs('previewImage'),
      symbol: 'CNTNT',
      decimals: 0,
      version: '0.1'
    };
    setMsg({ title: 'Upload ipfs', kind: 'info' });
    const response = await postDataFetch(API_META_TOKEN_URL, metadata);
    if (response.status !== 200) {
      return; // TODO Error
    }
    const result = await response.json();
    const { cid: metadataCid } = result;
    console.log('data', data);
    console.log('metadataCid', metadataCid);
    call({
      assets: [], // TODO data order -id
      digest: token.digest,
      enabled: true,
      metadata: strToByteStr(`ipfs://${metadataCid}`),
      price: Math.floor(data.price! * 1000000),
      royalties: Math.floor(data.royalties! * 10)
    });
    console.log('publish', data);
  };

  return (
    <section className={'h-full'}>
      <div className={'flex gap-x-3'}>
        <div style={{ flex: '1 0' }} className={'w-1/2 flex flex-col flex-grow'}>
          <div
            style={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative'
            }}
          >
            <div className={'absolute top-0 left-0 w-full h-full'}>
              <PreviewToken url={ipfsToUrl(urlToIpfs(token.cid))} width={token.state.root.width ?? 1000} height={token.state.root.height ?? 1000} />
            </div>
          </div>
        </div>
        <div className={'w-1/2'}>
          <form className={'flex gap-y-3 flex-col'} onSubmit={handleSubmit(onSubmit)}>
            {errors.name && <p>name is required.</p>}
            {errors.royalties && <p>royalties error.</p>}
            <Input label={'Name'} placeholder={'Name (max 280 characters)'} register={register('name', { required: true, minLength: 3, maxLength: 280 })} />
            <Input
              type={'textarea'}
              placeholder={'Description (max 2048 characters)'}
              label={'Description'}
              register={register('description', { maxLength: 2048, required: true, minLength: 12 })}
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
                  label={'Price'}
                  type={'number'}
                  // defaultValue={null}
                  placeholder={'ꜩ Price (0-9999)'}
                  register={register('price', { min: 0, max: Infinity, required: true, valueAsNumber: true })}
                />
              </div>
            </div>
            <input ref={refSubmit} className={'hidden'} type="submit" />
          </form>
          <div className={'mt-8 flex justify-end items-center space-x-2'}>
            <i className={'font-thin text-sm opacity-90 text-warn'}>warning: edit is not available in beta version</i>
            <CustomButton
              onClick={() => {
                refSubmit.current?.click();
              }}
              style={'white'}
              value={'mint'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MintToken;
