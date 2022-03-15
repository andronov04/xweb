import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import { HTMLInputTypeAttribute } from 'react';

interface IInput {
  register: UseFormRegisterReturn;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | 'textarea' | undefined;
}
const Input = ({ register, label, type, placeholder }: IInput) => (
  <div className={'flex font-thin flex-col'}>
    <label className={'text-inactive'}>{label}</label>
    {type === 'textarea' ? (
      <textarea {...register} placeholder={placeholder} className={'rounded-sm font-thin bg-black p-2'} />
    ) : (
      <input type={type} {...register} placeholder={placeholder} className={'rounded-sm font-thin bg-black p-2'} />
    )}
  </div>
);

export default Input;
