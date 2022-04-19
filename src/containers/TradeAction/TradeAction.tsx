import { IToken } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { TradeTokenCallData } from '../../types/contract';
import { getWallet } from '../../api/WalletApi';
import { displayPrice } from '../../utils';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Form/Input';
import Subscription from '../../components/Subscription/Subscription';
import { SUB_ACTION_OP_HASH } from '../../api/subscription';
import { setMsg } from '../../services/snackbar';
import { useRouter } from 'next/router';

const TradeAction = ({ item }: { item: IToken }) => {
  const router = useRouter();
  const [opHash, setOpHash] = useState<string | null>();
  const [trade, setTrade] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const user = item.user?.username ?? item.user?.id;
  const {
    call,
    state: { loading, status, result }
  } = useContract<TradeTokenCallData>(getWallet().tradeToken);
  const { call: callCancel, state: stateCancel } = useContract<number>(getWallet().cancelOffer);
  const refSubmit = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data) => {
    console.log('onSubmit:::', data);
    const price = Math.floor(data.price * 1000000); // Math.floor(parseFloat(price) * 1000000)
    if (item.user && item.owner) {
      call({
        ownerId: item.owner.id, // owner current
        tokenId: item.id,
        userId: item.user.id, // creator
        price: price
      });
    }
  };

  useEffect(() => {
    if (result) {
      setMsg({ block: true, autoClose: false, clear: true, title: 'Waiting confirmation...', kind: 'info' });
      // wait subscript in db
      setOpHash(result);
    }
  }, [result]);

  // console.log('user', item);
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
              setMsg({ clear: true, autoClose: 1000, title: 'Finished', kind: 'success' });
              router.reload();
            }
          }}
        />
      ) : null}

      {item.offer ? (
        <CustomButton
          onClick={() => {
            console.log('Cancel Trade');
            if (item.offer) {
              callCancel(item.offer.id);
            }
          }}
          style={'white'}
          styles={{
            color: 'rgba(255,53,53,0.9)'
          }}
          value={`Cancel trade (${displayPrice(item.offer.price)} ꜩ)`}
        />
      ) : (
        <div className={'flex gap-x-3 justify-start items-center'}>
          {trade ? (
            <div>
              <form className={'flex gap-y-3 flex-col'} onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label={null}
                  type={'number'}
                  defaultValue={0}
                  min={0}
                  placeholder={'ꜩ (0-9999)'}
                  register={register('price', {
                    min: 0,
                    max: Infinity,
                    required: { message: 'Required extended price', value: true },
                    valueAsNumber: true
                  })}
                />
                <input ref={refSubmit} className={'hidden'} type="submit" />
              </form>
            </div>
          ) : null}
          <CustomButton
            onClick={() => {
              setTrade(true);
              refSubmit.current?.click();
            }}
            style={'white'}
            value={trade ? 'List' : 'List for trade'}
          />
          {trade && (
            <CustomButton
              onClick={() => {
                setTrade(false);
              }}
              styles={{
                color: 'rgba(255,53,53,0.9)'
              }}
              style={'black'}
              value={'Cancel'}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TradeAction;
