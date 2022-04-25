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
          paddingTop: '0.6rem',
          paddingBottom: '0.5rem',
          ...styles
        }}
        onClick={onClick}
        disabled={disabled}
        className={`${classNames} ${
          style === 'white' ? ' bg-white text-black' : 'bg-white10 text-inactive '
        } font-normal text-lg hover:opacity-80 rounded-lg py-2.5 px-4`}
      >
        {value}
      </button>
    </>
  );
};

export default CustomButton;
