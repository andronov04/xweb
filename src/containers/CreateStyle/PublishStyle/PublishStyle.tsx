import { useForm } from 'react-hook-form';
import Input from '../../../components/Form/Input';
import { useRef } from 'react';
import CustomButton from '../../../components/CustomButton/CustomButton';
import PreviewMedia from './PreviewMedia/PreviewMedia';

const PublishStyle = () => {
  // TODO Validation https://github.com/ianstormtaylor/superstruct one place for use backend and another
  const refSubmit = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log('onSubmit', data);
  };

  return (
    <section className={'h-full'}>
      <div className={'flex gap-x-3'}>
        <div className={'w-1/2'}>
          <form className={'flex gap-y-3 flex-col'} onSubmit={handleSubmit(onSubmit)}>
            {errors.name && <p>name is required.</p>}
            {errors.royalties && <p>royalties error.</p>}
            <Input label={'Name'} placeholder={'Name (max 280 characters)'} register={register('name', { required: true, maxLength: 280 })} />
            <Input
              type={'textarea'}
              placeholder={'Description (max 2048 characters)'}
              label={'Description'}
              register={register('description', { maxLength: 2048 })}
            />
            <Input label={'Tags'} placeholder={'Tags (comma separated)'} register={register('tags', { maxLength: 512 })} />

            <div className={'w-full flex justify-end text-right mt-8'}>
              <Input
                label={'Royalties'}
                type={'number'}
                placeholder={'royalties (0-25%)'}
                register={register('royalties', { min: 0, max: 25, valueAsNumber: true })}
              />
            </div>
            <input ref={refSubmit} className={'hidden'} type="submit" />
          </form>
        </div>
        <div className={'w-1/2'}>
          <div className={'p-4'}>
            <PreviewMedia url={'http://localhost:8001/'} />
          </div>
        </div>
      </div>
      <div className={'flex justify-end items-center space-x-2'}>
        <i className={'font-thin text-sm opacity-90 text-warn'}>warning: edit is not available in beta version</i>
        <CustomButton style={'white'} value={'publish'} />
      </div>
    </section>
  );
};

export default PublishStyle;
