interface IButton {
  value: string;
  classNames?: string;
  onClick?: () => void;
  style?: 'black' | 'white';
}

const CustomButton = ({ value, classNames, onClick, style }: IButton) => {
  return (
    <>
      <button
        onClick={onClick}
        className={` ${classNames} ${style === 'white' ? ' bg-white text-black' : 'bg-white10 text-inactive '} hover:opacity-80 rounded-sm py-3 px-5`}
      >
        {value}
      </button>
    </>
  );
};

export default CustomButton;
