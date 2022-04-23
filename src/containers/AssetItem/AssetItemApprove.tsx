import { IAsset, IAssetFlag } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { MintStatusCallData } from '../../types/contract';
import { getWallet } from '../../api/WalletApi';
import { useEffect, useState } from 'react';
import Waiting from '../../components/Waiting/Waiting';
import { useRouter } from 'next/router';

const AssetItemApprove = ({ item }: { item: IAsset }) => {
  const {
    call,
    state: { loading, status, result }
  } = useContract<MintStatusCallData>(getWallet().statusAsset);
  const router = useRouter();
  const [opHash, setOpHash] = useState<string | null>();
  // console.log('useContract:::', loading, status, result);

  useEffect(() => {
    if (result) {
      setOpHash(result);
    }
  }, [result]);

  // TODO All flags
  return (
    <div className={'flex justify-end text-right'}>
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
          call({
            token_id: item.id,
            status: IAssetFlag.NONE
          });
        }}
        style={'white'}
        classNames={'bg-active text-dark hover:bg-inactive'}
        value={'Approve'}
      />
    </div>
  );
};

export default AssetItemApprove;
