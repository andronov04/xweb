import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import { HTMLInputTypeAttribute } from 'react';

interface IInput {
  register: UseFormRegisterReturn;
  label: string | null;
  placeholder?: string;
  defaultValue?: string | number;
  min?: number;
  max?: number;
  type?: HTMLInputTypeAttribute | 'textarea' | undefined;
}
const Input = ({ register, label, type, placeholder, defaultValue, min, max }: IInput) => (
  <div className={'flex font-normal flex-col'}>
    {label && <label className={'text-inactive'}>{label}</label>}
    {type === 'textarea' ? (
      <textarea
        {...register}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={'rounded-md border-2 border-whitegrey focus:border-active  border-solid bg-black p-2'}
      />
    ) : (
      <input
        defaultValue={defaultValue}
        type={type}
        {...register}
        min={min}
        max={max}
        step={'any'}
        placeholder={placeholder}
        className={'rounded-md border-2 border-whitegrey focus:border-active border-solid bg-black p-2'}
      />
    )}
  </div>
);

export default Input;
