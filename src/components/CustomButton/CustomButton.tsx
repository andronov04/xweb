import { CSSProperties } from 'react';

interface IButton {
  value: string;
  classNames?: string;
  onClick?: () => void;
  disabled?: boolean;
  styles?: Partial<CSSProperties>;
  style?: 'black' | 'white';
}

const CustomButton = ({ value, classNames, disabled, onClick, style, styles }: IButton) => {
  return (
    <>
      <button
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...styles
        }}
        onClick={onClick}
        disabled={disabled}
        className={`${classNames} ${
          style === 'white' ? ' bg-white text-black' : 'bg-white10 text-inactive '
        } font-normal hover:opacity-80 rounded-lg py-2 px-5`}
      >
        {value}
      </button>
    </>
  );
};

export default CustomButton;
