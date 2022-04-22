import { IUser } from '../../types';
import Avatar from '../../components/Avatar/Avatar';
import CustomButton from '../../components/CustomButton/CustomButton';
import Input from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useContract } from '../../hooks/use-contract/useContract';
import { MintUpdProfileCallData } from '../../types/contract';
import { getWallet } from '../../api/WalletApi';
import Waiting from '../../components/Waiting/Waiting';

const UserEdit = ({ user }: { user: IUser }) => {
  const [opHash, setOpHash] = useState<string | null>();
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

  const onSubmit = async (data) => {
    console.log('data:::', data);

    // TEST
    setOpHash('test');
    /*
    1 - Upload file
    2 - Upload metadata
    3 - Call contract
     */
  };

  return (
    <div className={'flex w-full items-center justify-start gap-x-10'}>
      {opHash ? (
        <Waiting
          opHash={opHash}
          onSuccess={(action) => {
            console.log('onSuccess:::', action);
            setOpHash('');
          }}
          onError={(e) => {
            console.log('onError:::', e);
          }}
        />
      ) : null}
      <div className={'text-center'}>
        <Avatar avatarUri={user.avatarUri ?? ''} />
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
          <input {...register('file')} type="file" multiple={false} className={'hidden'} id={'file'} accept="image/*" />
          <Input
            label={'Username'}
            placeholder={'max 36 characters'}
            register={register('name', {
              required: { message: 'Required name', value: true },
              minLength: { message: 'Name min length 3', value: 3 },
              maxLength: { message: 'Name max length 280', value: 36 }
            })}
          />
          <Input
            type={'textarea'}
            placeholder={'max 512 characters'}
            label={'Description'}
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
            //  Callback cancel
          }}
          value={'Cancel'}
        />
      </div>
    </div>
  );
};

export default UserEdit;
