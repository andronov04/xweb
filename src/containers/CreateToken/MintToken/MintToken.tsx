import { useForm } from 'react-hook-form';
import Input from '../../../components/Form/Input';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ipfsToUrl, urlToIpfs } from '../../../utils';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useContract } from '../../../hooks/use-contract/useContract';
import { MintTokenCallData } from '../../../types/contract';
import { getWallet } from '../../../api/WalletApi';
import { ITokenMetadata } from '../../../types/metadata';
import { postDataFetch } from '../../../api/RestApi';
import { API_META_TOKEN_URL } from '../../../constants';
import { strToByteStr } from '../../../utils/string';
import { clearMsg, setMsg } from '../../../services/snackbar';
import { useRouter } from 'next/router';
import { MichelsonMap } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import Waiting from '../../../components/Waiting/Waiting';
import ItemToken from '../../../components/Item/ItemToken';
import { setMetaFormats } from '../../../utils/mime';

const MintToken = () => {
  const [opHash, setOpHash] = useState<string | null>();
  const router = useRouter();
  const token = useMemo(() => {
    let tokenStorage: any = JSON.parse(localStorage.getItem('token') ?? '{}');
    if (!tokenStorage || !Object.keys(tokenStorage).length) {
      router.replace('/').then();
    }
    console.log('tokenStorage', tokenStorage);
    return tokenStorage;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const refSubmit = useRef<HTMLInputElement | null>(null);
  const {
    call,
    state: { loading, status, result }
  } = useContract<MintTokenCallData>(getWallet().mintToken);

  useEffect(() => {
    if (result) {
      // wait subscript in db
      setOpHash(result);
    }
  }, [result]);

  console.log('token', token);
  const w = token?.snapshot?.state?.root?.properties?.find((a) => a.id === 'size')?.state?.width?.value ?? 1000;
  const h = token?.snapshot?.state?.root?.properties?.find((a) => a.id === 'size')?.state?.height?.value ?? 1000;

  const getMetadata = (data: any = {}): ITokenMetadata => {
    let previewImage = token.previews.find((a) => a.format === 'png'); //asset.previews[0];
    if (!previewImage) {
      previewImage = token.previews.find((a) => a.format === 'jpeg' || a.format === 'jpg');
    }
    if (!previewImage) {
      throw 'No preview image';
    }
    const tags = (data.tags?.split(',') ?? []).filter((a) => a.length);

    return {
      name: data.name,
      description: data.description ?? '',
      tags: tags,
      isTransferable: true,
      artifactUri: urlToIpfs(token.cid),
      displayUri: urlToIpfs(previewImage.cid),
      thumbnailUri: urlToIpfs(previewImage.cid),
      stateUri: urlToIpfs(token.stateCid ?? ''),
      symbol: 'CNTNT',
      decimals: 0,
      version: '0.1',
      type: 'Token',
      date: new Date().toISOString(),
      formats: setMetaFormats(token.previews, {
        width: w,
        height: h,
        cid: token.cid,
        hash: ''
      })
    };
  };

  const onSubmit = async (data) => {
    const previewImage = token.previews[0];

    if (!previewImage) {
      setMsg({ clear: true, title: 'You should set preview', kind: 'error' });
      return;
    }

    // Generate meta
    const metadata = getMetadata(data);
    setMsg({ block: true, autoClose: false, clear: true, title: 'Uploading...', kind: 'info' });
    const response = await postDataFetch(API_META_TOKEN_URL, metadata);
    if (response.status !== 200) {
      return; // TODO Error
    }
    const result = await response.json();
    const { cid: metadataCid } = result;
    if (!metadataCid) {
      setMsg({ title: 'Error', kind: 'error' });
      return;
    }
    clearMsg();
    const _assets = Object.fromEntries(token.snapshot.state.data.assets.map((a) => [a.order, new BigNumber(a.id)]));
    call({
      assets: MichelsonMap.fromLiteral(_assets) as any,
      digest: token.digest,
      royalties: Math.floor(data.royalties! * 10),
      metadata: strToByteStr(urlToIpfs(metadataCid))
    });
  };

  const submit = () => {
    if (Object.keys(errors).length) {
      const desc = Object.values(errors)
        .filter((a) => a.message)
        .map((a) => a.message)
        .join('. ');
      setMsg({ clear: true, title: 'Form error', description: desc, kind: 'error' });
    }
    refSubmit.current?.click();
  };

  return (
    <section className={'h-full'}>
      {opHash ? (
        <Waiting
          opHash={opHash}
          onSuccess={(action) => {
            router.replace(`/token/${action.token.slug}`).then();
          }}
        />
      ) : null}
      {/*<div className={' mb-4'}>*/}
      {/*  <Footnote type={'warning'}>*/}
      {/*    <p>Note: Check all formats before publishing.</p>*/}
      {/*  </Footnote>*/}
      {/*</div>*/}
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
              <div>
                {token ? (
                  <ItemToken
                    formats={true}
                    item={{
                      id: -1,
                      name: '',
                      width: w,
                      height: h,
                      metadata: getMetadata()
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
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
                minLength: { message: 'Description min length 12', value: 0 }
              })}
            />
            <Input
              label={'Tags'}
              placeholder={'Tags (comma separated)'}
              register={register('tags', {
                maxLength: { message: 'Tags max length 108', value: 108 }
              })}
            />
            <div className={'w-1/2'}>
              <Input
                label={'Royalties'}
                type={'number'}
                defaultValue={0}
                min={0}
                max={20}
                placeholder={'Royalties (0-20%)'}
                register={register('royalties', {
                  min: 0,
                  max: 20,
                  required: { message: 'Required royalties', value: true },
                  valueAsNumber: true
                })}
              />
            </div>
            <input ref={refSubmit} className={'hidden'} type="submit" />
          </form>
          <div className={'mt-8 flex justify-end items-center space-x-2'}>
            <CustomButton
              onClick={() => {
                submit();
              }}
              style={'white'}
              value={'Mint'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MintToken;
