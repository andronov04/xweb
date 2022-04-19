import { IToken } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { getWallet } from '../../api/WalletApi';
import { displayPrice } from '../../utils';
import { useEffect, useState } from 'react';
import { setMsg } from '../../services/snackbar';
import Subscription from '../../components/Subscription/Subscription';
import { SUB_ACTION_OP_HASH } from '../../api/subscription';
import { useRouter } from 'next/router';
import { CollectCallData } from '../../types/contract';
import { useStore } from '../../store';

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
      setMsg({ block: true, autoClose: false, clear: true, title: 'Waiting confirmation...', kind: 'info' });
      // wait subscript in db
      setOpHash(result);
    }
  }, [result]);

  return (
    <div>
      {opHash ? (
        <Subscription
          query={SUB_ACTION_OP_HASH}
          variables={{ opHash: opHash }}
          onComplete={(data) => {
            console.log('onComplete:::', data);
            // TODO Timeout
            const action = data?.action?.[0];
            if (action) {
              setMsg({ clear: true, autoClose: 1000, title: 'Purchased', kind: 'success' });
              router.reload();
            }
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
