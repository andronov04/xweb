import Link from 'next/link';
import { IItem } from '../../types';
import { displayPrice } from '../../utils';
import { useEffect } from 'react';
import { ItemContent } from './ItemMixin';
import { ItemLine } from './ItemLine';

const getUrl = (item: IItem) => {
  if (item.__typename === 'asset') {
    return `/asset/${item.slug ?? item.id}`;
  }
  if (!item.slug || item.slug === '') {
    return `/t/${item.id}`;
  }
  return `/token/${item.slug ?? item.id}`;
};

interface IItemComp {
  item: IItem;
  mode: 'normal' | 'selected' | 'offer' | 'all';
  onClickItem?: (item: IItem) => void;
  onMountItem?: (item: IItem) => void;
  active?: boolean;
  hidePrice?: boolean;
}

const Item = ({ item, onMountItem, mode, hidePrice, onClickItem, active }: IItemComp) => {
  useEffect(() => {
    onMountItem?.(item);
  }, [onMountItem, item]);

  const tokens = item.assetTokenAssets_aggregate?.aggregate.count ?? 0;

  return (
    <div className={'font-normal text-lg '}>
      {mode === 'selected' && (
        <div>
          <ItemLine onClickItem={onClickItem} active={active} item={item} />
        </div>
      )}
      {mode === 'normal' && (
        <div className={'overflow-hidden'}>
          <Link href={getUrl(item)}>
            <a href={getUrl(item)}>
              <ItemContent item={item} />
            </a>
          </Link>
          <h2 className={'truncate ... pt-2 text-active'}>{item.name}</h2>
          <div className={'grid justify-between text-base'}>
            <div className={'flex truncate ...'}>
              <p className={'truncate ... text-inactive'}>
                <Link href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                  <a className={'hover:opacity-90 cursor-pointer'} href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                    @{item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}
                  </a>
                </Link>
              </p>
              {item.owner?.verified || (item.user?.verified && item.owner?.id !== item.user?.id) ? (
                <span className={'px-1'}>
                  <svg className={'inline -mt-0.5'} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.53847 5.61538L6.15384 8.84615L4.46155 7.23076"
                      stroke="white"
                      strokeOpacity="0.7"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.75736 11.2426C2.22636 10.7116 2.57855 9.59683 2.30828 8.9436C2.0281 8.26644 1 7.72144 1 6.99998C1 6.27853 2.0281 5.73354 2.30828 5.05639C2.57855 4.40317 2.22636 3.28836 2.75736 2.75736C3.28836 2.22636 4.40317 2.57855 5.0564 2.30828C5.73356 2.0281 6.27856 1 7.00002 1C7.72147 1 8.26646 2.0281 8.94361 2.30828C9.59683 2.57855 10.7116 2.22636 11.2426 2.75736C11.7736 3.28836 11.4214 4.40317 11.6917 5.0564C11.9719 5.73356 13 6.27856 13 7.00002C13 7.72147 11.9719 8.26646 11.6917 8.94361C11.4214 9.59683 11.7736 10.7116 11.2426 11.2426C10.7116 11.7736 9.59683 11.4214 8.9436 11.6917C8.26644 11.9719 7.72144 13 6.99998 13C6.27853 13 5.73354 11.9719 5.05639 11.6917C4.40317 11.4214 3.28836 11.7736 2.75736 11.2426Z"
                      stroke="white"
                      strokeOpacity="0.7"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}
      {mode === 'offer' && (
        <div className={'overflow-hidden'}>
          <Link href={getUrl(item)}>
            <a href={getUrl(item)}>
              <ItemContent item={item} />
            </a>
          </Link>
          <h2 className={'truncate ... pt-2 text-active'}>
            <Link href={getUrl(item)}>
              <a href={getUrl(item)}>{item.name}</a>
            </Link>
          </h2>
          <div className={'flex justify-between gap-x-1 text-base items-center'}>
            <div className={'flex truncate ...'}>
              <p className={'truncate ...  text-inactive'}>
                <Link href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                  <a className={'hover:opacity-90 cursor-pointer'} href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                    @{item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}
                  </a>
                </Link>
              </p>
              {item.owner?.verified || (item.user?.verified && item.owner?.id !== item.user?.id) ? (
                <span className={'px-1'}>
                  <svg className={'inline -mt-0.5'} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.53847 5.61538L6.15384 8.84615L4.46155 7.23076"
                      stroke="white"
                      strokeOpacity="0.7"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.75736 11.2426C2.22636 10.7116 2.57855 9.59683 2.30828 8.9436C2.0281 8.26644 1 7.72144 1 6.99998C1 6.27853 2.0281 5.73354 2.30828 5.05639C2.57855 4.40317 2.22636 3.28836 2.75736 2.75736C3.28836 2.22636 4.40317 2.57855 5.0564 2.30828C5.73356 2.0281 6.27856 1 7.00002 1C7.72147 1 8.26646 2.0281 8.94361 2.30828C9.59683 2.57855 10.7116 2.22636 11.2426 2.75736C11.7736 3.28836 11.4214 4.40317 11.6917 5.0564C11.9719 5.73356 13 6.27856 13 7.00002C13 7.72147 11.9719 8.26646 11.6917 8.94361C11.4214 9.59683 11.7736 10.7116 11.2426 11.2426C10.7116 11.7736 9.59683 11.4214 8.9436 11.6917C8.26644 11.9719 7.72144 13 6.99998 13C6.27853 13 5.73354 11.9719 5.05639 11.6917C4.40317 11.4214 3.28836 11.7736 2.75736 11.2426Z"
                      stroke="white"
                      strokeOpacity="0.7"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}
            </div>
            {!hidePrice ? <p className={'whitespace-pre text-white'}>{`${displayPrice(item.offer?.price ?? item.price ?? 0)} ꜩ`}</p> : null}
          </div>
        </div>
      )}
      {mode === 'all' && (
        <div className={'overflow-hidden'}>
          <Link href={getUrl(item)}>
            <a href={getUrl(item)}>
              <ItemContent item={item} />
            </a>
          </Link>
          <h2 className={'truncate ... pt-2 text-active'}>{item.name}</h2>
          <div className={'flex text-base justify-between items-center'}>
            <p className={'truncate ... text-inactive'}>
              <span>{item['__typename'] === 'token' ? 'Token' : 'Asset'}</span>
              {tokens ? (
                <>
                  {' '}
                  /{' '}
                  <span>
                    {tokens} {tokens > 1 ? 'tokens' : 'token'}
                  </span>
                </>
              ) : null}
            </p>
            {item.offer && !hidePrice ? <p className={'text-white'}>{`${displayPrice(item.offer.price ?? 0)} ꜩ`}</p> : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
