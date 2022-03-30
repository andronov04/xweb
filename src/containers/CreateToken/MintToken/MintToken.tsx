import { useForm } from 'react-hook-form';
import { useStore } from '../../../store';
import Input from '../../../components/Form/Input';
import { useRef } from 'react';
import { ipfsToUrl, urlToIpfs } from '../../../utils';
import PreviewToken from './PreviewToken/PreviewToken';

const MintToken = () => {
  const token = useStore((state) => state.token);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const refSubmit = useRef<HTMLInputElement | null>(null);
  console.log('token', token);

  const onSubmit = async (data) => {
    console.log('data', data);
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
              register={register('description', { maxLength: 2048, required: true, minLength: 80 })}
            />
            <Input label={'Tags'} placeholder={'Tags (comma separated)'} register={register('tags', { maxLength: 512 })} />

            <div className={'w-full gap-x-3 flex justify-start text-left mt-8'}>
              <div className={'w-1/2'}>
                <Input
                  label={'Royalties'}
                  type={'number'}
                  // defaultValue={null}
                  placeholder={'royalties (0-25%)'}
                  register={register('royalties', { min: 0, max: 25, valueAsNumber: true })}
                />
              </div>
              <div className={'w-1/2'}>
                <Input
                  label={'Price'}
                  type={'number'}
                  // defaultValue={null}
                  placeholder={'ꜩ Price (0-9999)'}
                  register={register('price', { min: 0, max: 25, valueAsNumber: true })}
                />
              </div>
            </div>
            <input ref={refSubmit} className={'hidden'} type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default MintToken;
