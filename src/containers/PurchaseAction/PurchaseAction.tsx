import { IToken } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { getWallet } from '../../api/WalletApi';
import { displayPrice } from '../../utils';
import { useEffect, useState } from 'react';
import { setMsg } from '../../services/snackbar';
import { useRouter } from 'next/router';
import { CollectCallData } from '../../types/contract';
import { useStore } from '../../store';
import Waiting from '../../components/Waiting/Waiting';

const PurchaseAction = ({ item }: { item: IToken }) => {
  const router = useRouter();
  const currentUser = useStore((state) => state.user);
  const [opHash, setOpHash] = useState<string | null>();
  const {
    call,
    state: { loading, status, result }
  } = useContract<CollectCallData>(getWallet().collect);

  useEffect(() => {
    if (result) {
      // wait subscript in db
      setOpHash(result);
    }
  }, [result]);

  return (
    <div>
      {opHash ? (
        <Waiting
          opHash={opHash}
          onSuccess={(action) => {
            router.reload();
          }}
          onError={(e) => {
            alert(e);
          }}
        />
      ) : null}
      <CustomButton
        onClick={() => {
          if (!currentUser) {
            setMsg({ clear: true, title: 'You are not logged in. Please log in and try again', kind: 'error' });
            return;
          }
          if (item.offer) {
            call({
              id: item.offer.id,
              price: item.offer.price
            });
          }
        }}
        style={'white'}
        classNames={'bg-active text-dark hover:bg-inactive'}
        value={`Purchase ${displayPrice(item.offer?.price ?? 0)} ꜩ`}
      />
    </div>
  );
};

export default PurchaseAction;
