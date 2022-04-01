import { IToken } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { TradeTokenCallData } from '../../types/contract';
import { getWallet } from '../../api/WalletApi';
import { displayPrice } from '../../utils';

const TradeAction = ({ item }: { item: IToken }) => {
  const user = item.user?.username ?? item.user?.id;
  const {
    call,
    state: { loading, status, result }
  } = useContract<TradeTokenCallData>(getWallet().tradeToken);
  // console.log('user', item);
  return (
    <div>
      {item.offer ? (
        <CustomButton
          onClick={() => {
            console.log('Cancel Trade');
            // TODO Cancel trade
            // const price = Math.floor(parseFloat('0') * 1000000); // Math.floor(parseFloat(price) * 1000000)
            // call({
            //   ownerId: 'tz1iChpqVTi68JTcbpmmVnD9yfXxe2UxTkZL', // owner current
            //   tokenId: 3,
            //   userId: 'tz1iChpqVTi68JTcbpmmVnD9yfXxe2UxTkZL', // creator
            //   price: price,
            //   royalty: Math.floor(0 * 10), // from assets map address:royalty
            //   royalties: {
            //     tz1iChpqVTi68JTcbpmmVnD9yfXxe2UxTkZL: Math.floor(0 * 10)
            //   } // from assets map address:royalty
            // });
          }}
          style={'white'}
          styles={{
            color: 'rgba(255,53,53,0.9)'
          }}
          value={`Cancel trade (${displayPrice(item.offer.price)} ꜩ)`}
        />
      ) : (
        <CustomButton
          onClick={() => {
            console.log('trade');
            const price = Math.floor(parseFloat('0') * 1000000); // Math.floor(parseFloat(price) * 1000000)
            call({
              ownerId: 'tz1iChpqVTi68JTcbpmmVnD9yfXxe2UxTkZL', // owner current
              tokenId: 3,
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
      )}
    </div>
  );
};

export default TradeAction;
