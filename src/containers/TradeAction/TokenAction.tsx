import { IToken } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { getWallet } from '../../api/WalletApi';
import { useEffect, useState } from 'react';
import { setMsg } from '../../services/snackbar';
import { useRouter } from 'next/router';
import { UpdateTokenCallData } from '../../types/contract';
import { useStore } from '../../store';
import Waiting from '../../components/Waiting/Waiting';

const TokenAction = ({ item }: { item: IToken }) => {
  const router = useRouter();
  const currentUser = useStore((state) => state.user);
  const [opHash, setOpHash] = useState<string | null>();
  const {
    call,
    state: { loading, status, result }
  } = useContract<UpdateTokenCallData>(getWallet().updateToken);

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
        />
      ) : null}
      <CustomButton
        onClick={() => {
          if (!currentUser) {
            setMsg({ clear: true, title: 'You are not logged in. Please log in and try again', kind: 'error' });
            return;
          }
          call({
            token_id: item.id,
            enabled: !item.enabled
          });
        }}
        styles={{
          color: item.enabled ? 'rgba(255,53,53,0.9)' : '#0C9300',
          background: 'transparent'
        }}
        style={'black'}
        classNames={'bg-active text-dark hover:bg-inactive'}
        value={item.enabled ? 'Disable' : 'Enable'}
      />
    </div>
  );
};

export default TokenAction;
