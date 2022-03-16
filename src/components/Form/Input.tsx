import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import { HTMLInputTypeAttribute } from 'react';

interface IInput {
  register: UseFormRegisterReturn;
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  type?: HTMLInputTypeAttribute | 'textarea' | undefined;
}
const Input = ({ register, label, type, placeholder, defaultValue }: IInput) => (
  <div className={'flex font-thin flex-col'}>
    <label className={'text-inactive'}>{label}</label>
    {type === 'textarea' ? (
      <textarea {...register} defaultValue={defaultValue} placeholder={placeholder} className={'rounded-sm font-thin bg-black p-2'} />
    ) : (
      <input defaultValue={defaultValue} type={type} {...register} placeholder={placeholder} className={'rounded-sm font-thin bg-black p-2'} />
    )}
  </div>
);

export default Input;
