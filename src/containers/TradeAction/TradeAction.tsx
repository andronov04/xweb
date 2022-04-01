import { IToken } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';

const TradeAction = ({ item }: { item: IToken }) => {
  const user = item.user?.username ?? item.user?.id;
  console.log('user');
  return (
    <div>
      <CustomButton
        onClick={() => {
          console.log('trade');
        }}
        style={'white'}
        value={'List fo trade'}
      />
    </div>
  );
};

export default TradeAction;
