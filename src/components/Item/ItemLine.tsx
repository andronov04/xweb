import { IItem } from '../../types';
import { ItemContent } from './ItemMixin';

interface IItemComp {
  item: IItem;
  mode?: 'main' | 'list';
  onSelect?: () => void;
  onClickItem?: (item: IItem) => void;
  active?: boolean;
  // mode: 'normal' | 'selected' | 'offer' | 'all';
  // onClickItem?: (item: IItem) => void;
  // onMountItem?: (item: IItem) => void;
}

export const ItemLine = ({ item, mode: _mode, active, onSelect, onClickItem }: IItemComp) => {
  const mode = _mode ?? 'list';
  const tokens = item.assetTokenAssets_aggregate?.aggregate.count ?? 0;
  return (
    <div className={'flex gap-x-6 justify-between items-center'}>
      <div className={'flex gap-x-6 justify-start items-center'}>
        <div className={'h-12 w-12 rounded-sm overflow-hidden'}>
          <ItemContent item={item} />
        </div>
        <div className={`flex-grow ${mode === 'main' ? 'text-2xl text-active' : 'text-xl text-inactive'}`}>
          <p>
            {item.name}
            {mode === 'list' && tokens > 0 ? (
              <span className={'ml-2 text-whitegrey text-sm'}>
                {tokens} {tokens > 1 ? 'tokens' : 'token'}
              </span>
            ) : null}
          </p>
        </div>
      </div>
      <div>
        {mode === 'main' ? (
          <div
            onClick={() => {
              onSelect?.();
            }}
            className={'flex select-none cursor-pointer hover:opacity-90 items-center gap-x-2 text-inactive text-xl'}
          >
            More assets
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.51761 8.70482C6.28756 9.09839 5.71244 9.09839 5.48239 8.70482L2.08097 2.88554C1.85092 2.49197 2.13848 2 2.59857 2H9.40143C9.86152 2 10.1491 2.49197 9.91903 2.88554L6.51761 8.70482Z"
                fill="white"
                fillOpacity="0.7"
              />
            </svg>
          </div>
        ) : null}
        {mode === 'list' && !active ? (
          <div
            onClick={() => {
              onClickItem?.(item);
            }}
            className={'text-active hover:opacity-90 cursor-pointer'}
          >
            Use this asset
          </div>
        ) : null}
      </div>
    </div>
  );
};
