import { IToken } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { TradeTokenCallData } from '../../types/contract';
import { getWallet } from '../../api/WalletApi';
import { displayPrice } from '../../utils';

const PurchaseAction = ({ item }: { item: IToken }) => {
  const user = item.user?.username ?? item.user?.id;
  const {
    call,
    state: { loading, status, result }
  } = useContract<TradeTokenCallData>(getWallet().tradeToken);

  return (
    <div>
      <CustomButton style={'white'} classNames={'bg-active text-dark hover:bg-inactive'} value={`Purchase ${displayPrice(item.offer?.price ?? 0)} ꜩ`} />
    </div>
  );
};

export default PurchaseAction;
