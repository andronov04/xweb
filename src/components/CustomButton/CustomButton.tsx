interface IButton {
  value: string;
  classNames?: string;
}

const CustomButton = ({ value, classNames }: IButton) => {
  return (
    <>
      <button className={` ${classNames} text-inactive hover:bg-white20 bg-white10 rounded-sm py-3 px-5`}>{value}</button>
    </>
  );
};

export default CustomButton;
