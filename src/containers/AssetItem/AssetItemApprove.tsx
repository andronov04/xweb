import { IAsset, IAssetFlag } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { MintStatusCallData } from '../../types/contract';
import { getWallet } from '../../api/WalletApi';
import { useEffect } from 'react';
import { setMsg } from '../../services/snackbar';

const AssetItemApprove = ({ item }: { item: IAsset }) => {
  const {
    call,
    state: { loading, status, result }
  } = useContract<MintStatusCallData>(getWallet().statusAsset);
  // console.log('useContract:::', loading, status, result);

  useEffect(() => {
    if (result) {
      setMsg({ clear: true, title: 'Success in blockchain. Update page after 1-2 minutes.' });
    }
  }, [result]);

  // TODO All flags
  return (
    <div className={'flex justify-end text-right'}>
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
