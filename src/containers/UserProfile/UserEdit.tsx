import { IUser } from '../../types';
import Avatar from '../../components/Avatar/Avatar';
import CustomButton from '../../components/CustomButton/CustomButton';
import Input from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useContract } from '../../hooks/use-contract/useContract';
import { MintUpdProfileCallData } from '../../types/contract';
import { getWallet } from '../../api/WalletApi';
import Waiting from '../../components/Waiting/Waiting';
import { useRouter } from 'next/router';
import { postDataFetch, postFetch } from '../../api/RestApi';
import { API_META_PROFILE_URL, FILE_API_PROFILE_IMG_URL } from '../../constants';
import { clearMsg, setMsg } from '../../services/snackbar';
import { urlToIpfs } from '../../utils';
import { IProfileMetadata } from '../../types/metadata';
import { strToByteStr } from '../../utils/string';

const UserEdit = ({ user, onCancel }: { user: IUser; onCancel: () => void }) => {
  const router = useRouter();
  const [opHash, setOpHash] = useState<string | null>();
  const [fileAvatar, setFileAvatar] = useState<File | null>();
  const [avatarUri, setAvatarUri] = useState<string>(user.avatarUri ?? '');
  const [username, setUsername] = useState<string>('');
  const refSubmit = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const {
    call,
    state: { loading, status, result }
  } = useContract<MintUpdProfileCallData>(getWallet().updateProfile);

  useEffect(() => {
    if (result) {
      setOpHash(result);
    }
  }, [result]);

  const onSubmit = async (data) => {
    setMsg({ autoClose: false, clear: true, block: true, title: 'Generate metadata...', kind: 'info' });
    setUsername(data.username);

    let tempAvatarUri: string | null = null;
    if (fileAvatar) {
      const formData = new FormData();
      formData.append('file', fileAvatar);
      const response = await postFetch(FILE_API_PROFILE_IMG_URL, formData);
      if (response.status !== 200) {
        setMsg({ clear: true, title: 'Error loading the file', kind: 'error' });
        return;
      }
      const resp = await response.json();
      tempAvatarUri = urlToIpfs(resp.cid);
    }

    const metadata: IProfileMetadata = {
      username: data.username,
      description: data.description,
      avatarUri: tempAvatarUri ?? avatarUri
    };

    setMsg({ autoClose: false, clear: true, block: true, title: 'Uploading...', kind: 'info' });
    const response = await postDataFetch(API_META_PROFILE_URL, metadata);
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

    call({
      metadata: strToByteStr(urlToIpfs(metadataCid)),
      username: data.username
    });
  };

  const onFileChange = (e) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      setFileAvatar(files[0]);
      reader.readAsDataURL(files[0]);
      reader.onload = function () {
        if (typeof reader.result === 'string') {
          setAvatarUri(reader.result);
        }
      };
      reader.onerror = function (error) {
        // console.log('Error: ', error);
      };
    }
  };

  return (
    <div className={'flex w-full items-center justify-start gap-x-10'}>
      {opHash ? (
        <Waiting
          opHash={opHash}
          onSuccess={(action) => {
            router.replace('/').then(() => {
              router.replace(`/@${username}`).then();
            });
          }}
          onError={(e) => {
            alert(e);
          }}
        />
      ) : null}
      <div className={'text-center'}>
        <Avatar avatarUri={avatarUri} pure={!avatarUri.startsWith('ipfs')} />
        <p
          onClick={() => {
            const el = document.querySelector('#file');
            if (el) {
              (el as HTMLButtonElement).click();
            }
          }}
          className={'text-inactive select-none cursor-pointer hover:opacity-80 mt-2'}
        >
          Upload photo
        </p>
      </div>
      <div className={'flex-grow flex items-start'}>
        <form className={'flex gap-y-3 flex-col w-full'} onSubmit={handleSubmit(onSubmit)}>
          <input {...register('file')} type="file" onChange={onFileChange} multiple={false} className={'hidden'} id={'file'} accept="image/*" />
          <Input
            label={'Username'}
            defaultValue={user.username}
            placeholder={'max 36 characters'}
            register={register('username', {
              required: { message: 'Required name', value: true },
              minLength: { message: 'Name min length 3', value: 3 },
              maxLength: { message: 'Name max length 36', value: 36 }
            })}
          />
          <Input
            type={'textarea'}
            placeholder={'max 512 characters'}
            label={'Description'}
            defaultValue={user.description}
            register={register('description', {
              maxLength: { message: 'Description max length 2048', value: 512 },
              required: false,
              // required: { message: 'Required description', value: false },
              minLength: { message: 'Description min length 0', value: 0 }
            })}
          />
          <input ref={refSubmit} className={'hidden'} type="submit" />
        </form>
      </div>
      <div className={'flex flex-col gap-y-2'}>
        <CustomButton
          style={'white'}
          value={'Submit'}
          onClick={() => {
            refSubmit.current?.click();
          }}
        />
        <CustomButton
          styles={{
            color: 'rgba(255,53,53,0.9)',
            background: 'transparent'
          }}
          onClick={() => {
            onCancel();
          }}
          value={'Cancel'}
        />
      </div>
    </div>
  );
};

export default UserEdit;
