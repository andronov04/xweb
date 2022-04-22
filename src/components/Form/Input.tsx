import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import { HTMLInputTypeAttribute } from 'react';

interface IInput {
  register: UseFormRegisterReturn;
  label: string | null;
  placeholder?: string;
  defaultValue?: string | number;
  min?: number;
  type?: HTMLInputTypeAttribute | 'textarea' | undefined;
}
const Input = ({ register, label, type, placeholder, defaultValue, min }: IInput) => (
  <div className={'flex font-thin flex-col'}>
    {label && <label className={'text-inactive'}>{label}</label>}
    {type === 'textarea' ? (
      <textarea {...register} defaultValue={defaultValue} placeholder={placeholder} className={'rounded-sm border border-solid font-thin bg-black p-2'} />
    ) : (
      <input
        defaultValue={defaultValue}
        type={type}
        {...register}
        min={min}
        placeholder={placeholder}
        className={'rounded-sm border border-solid font-thin bg-black p-2'}
      />
    )}
  </div>
);

export default Input;
