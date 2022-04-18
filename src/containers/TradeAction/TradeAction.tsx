import { IToken } from '../../types';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useContract } from '../../hooks/use-contract/useContract';
import { TradeTokenCallData } from '../../types/contract';
import { getWallet } from '../../api/WalletApi';
import { displayPrice } from '../../utils';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Form/Input';

const TradeAction = ({ item }: { item: IToken }) => {
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
  // console.log('user', item);
  return (
    <div>
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
            value={trade ? 'List' : 'List fo trade'}
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
