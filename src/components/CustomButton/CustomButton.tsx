interface IButton {
  value: string;
  classNames?: string;
  style?: 'black' | 'white';
}

const CustomButton = ({ value, classNames, style }: IButton) => {
  return (
    <>
      <button className={` ${classNames} ${style === 'white' ? ' bg-white text-black' : 'bg-white10 text-inactive '} hover:opacity-80 rounded-sm py-3 px-5`}>
        {value}
      </button>
    </>
  );
};

export default CustomButton;
