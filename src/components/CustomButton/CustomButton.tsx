import { CSSProperties } from 'react';

interface IButton {
  value: string;
  classNames?: string;
  onClick?: () => void;
  styles?: Partial<CSSProperties>;
  style?: 'black' | 'white';
}

const CustomButton = ({ value, classNames, onClick, style, styles }: IButton) => {
  return (
    <>
      <button
        style={styles}
        onClick={onClick}
        className={` ${classNames} ${style === 'white' ? ' bg-white text-black' : 'bg-white10 text-inactive '} font-thin hover:opacity-80 rounded-lg py-2 px-5`}
      >
        {value}
      </button>
    </>
  );
};

export default CustomButton;
