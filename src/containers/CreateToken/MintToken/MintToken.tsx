import { useForm } from 'react-hook-form';
import { useStore } from '../../../store';
import Input from '../../../components/Form/Input';
import { useEffect, useRef, useState } from 'react';
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
import Subscription from '../../../components/Subscription/Subscription';
import { SUB_ACTION_OP_HASH } from '../../../api/subscription';
import { useRouter } from 'next/router';

let extended = false; // for test
const MintToken = () => {
  const [opHash, setOpHash] = useState<string | null>();
  const router = useRouter();
  const token = useStore((state) => state.token);
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
  console.log('useContract:::', loading, status);

  useEffect(() => {
    console.log('result', result);
    if (result) {
      setMsg({ title: 'Waiting confirmation...', kind: 'info' });
      // wait subscript in db
      setOpHash(result);
    }
  }, [result]);

  const onSubmit = async (data) => {
    console.log('extended', extended);
    const w = token.state?.root?.width ?? 1000;
    const h = token.state?.root?.height ?? 1000;
    const previewImage = token.previews[0];

    if (!previewImage) {
      setMsg({ title: 'You need set preview', kind: 'error' });
      return;
    }
    // Generate meta
    const tags = (data.tags?.split(',') ?? []).filter((a) => a.length);
    const metadata: ITokenMetadata = {
      name: data.name,
      description: data.description,
      tags: tags,
      isTransferable: !extended,
      artifactUri: urlToIpfs(token.cid),
      displayUri: urlToIpfs(previewImage.cid),
      thumbnailUri: urlToIpfs(previewImage.cid),
      symbol: 'CNTNT',
      decimals: 0,
      version: '0.1',
      type: 'Token',
      date: new Date().toISOString(),
      formats: [
        {
          uri: urlToIpfs(previewImage.cid),
          hash: token.digest,
          mimeType: 'image/png',
          dimensions: {
            value: `${w}x${h}`,
            unit: 'px'
          }
        },
        {
          uri: urlToIpfs(token.cid),
          hash: token.digest,
          mimeType: 'text/html'
        }
      ]
      // TODO formats
      // State ??? stateUri
    };
    setMsg({ title: 'Upload ipfs', kind: 'info' });
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

    console.log('token', token);
    if (extended) {
      // TODO Create extended mint
    } else {
      call({
        assets: token.assets.map((a) => a.id), // TODO data ids
        digest: token.digest,
        enabled: true,
        metadata: strToByteStr(urlToIpfs(metadataCid))
      });
    }
    console.log('publish', data);
  };

  const submit = (_extended = false) => {
    extended = _extended;
    if (Object.keys(errors).length) {
      const desc = Object.values(errors)
        .filter((a) => a.message)
        .map((a) => a.message)
        .join('. ');
      setMsg({ title: 'Form error', description: desc, kind: 'error' });
    }
    refSubmit.current?.click();
  };

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
              router.replace(`/token/${action.token.slug}`).then();
            }
          }}
        />
      ) : null}
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
              <PreviewToken
                url={ipfsToUrl(urlToIpfs(token.cid))}
                width={token.state?.root?.width ?? 1000}
                height={token.state?.root?.height ?? 1000}
                onPreview={(cid, hash) => {
                  token.addPreview(cid, hash);
                }}
              />
            </div>
          </div>
        </div>
        <div className={'w-1/2'}>
          <i className={'font-thin text-sm opacity-90 text-warn'}>Warning: edit is not available in beta version</i>
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
          <div className={'mt-8 flex justify-end items-center space-x-2'}>
            <CustomButton
              onClick={() => {
                submit(true);
              }}
              style={'white'}
              value={'Extended mint 20 ꜩ'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MintToken;
