import { IToken } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { TradeTokenCallData } from '../../types/contract';
import { getWallet } from '../../api/WalletApi';
import { strToByteStr } from '../../utils/string';

const TradeAction = ({ item }: { item: IToken }) => {
  const user = item.user?.username ?? item.user?.id;
  const {
    call,
    state: { loading, status, result }
  } = useContract<TradeTokenCallData>(getWallet().tradeToken);
  console.log('user');
  /**
   * cs_address=cs_address,
   *             token_id=token_id,
   *             price=price,
   *             cs_royalties=cs_royalties,
   *             ct_royalties=ct_royalties,
   */
  return (
    <div>
      <CustomButton
        onClick={() => {
          console.log('trade');
          const price = Math.floor(parseFloat('0') * 1000000); // Math.floor(parseFloat(price) * 1000000)
          call({
            ownerId: 'tz1iChpqVTi68JTcbpmmVnD9yfXxe2UxTkZL', // owner current
            tokenId: 0,
            userId: 'tz1iChpqVTi68JTcbpmmVnD9yfXxe2UxTkZL', // creator
            price: price,
            royalty: Math.floor(0 * 10), // from assets map address:royalty
            royalties: {
              tz1iChpqVTi68JTcbpmmVnD9yfXxe2UxTkZL: Math.floor(0 * 10)
            } // from assets map address:royalty
          });
        }}
        style={'white'}
        value={'List fo trade'}
      />
    </div>
  );
};

export default TradeAction;
