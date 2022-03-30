import Link from 'next/link';
import { IItem } from '../../types';
import { ipfsToUrl } from '../../utils';

const getUrl = (item: IItem) => {
  if (item.__typename === 'asset') {
    return `/asset/${item.slug ?? item.id}`;
  }
  return `/token/${item.slug ?? item.id}`;
};

interface IItemComp {
  item: IItem;
  price?: boolean;
  mode: 'normal' | 'selected';
  onClickItem?: (item: IItem) => void;
  active?: boolean;
}

const ItemContent = ({ item }: { item: IItem }) => {
  return (
    <div
      style={{
        paddingTop: '100%',
        backgroundSize: 'cover',
        backgroundImage: `url(${ipfsToUrl(item.metadata?.thumbnailUri ?? '')})`
      }}
      className={'w-full bg-black rounded-sm '}
    />
  );
};

const Item = ({ item, price, mode, onClickItem, active }: IItemComp) => {
  const plural_suggest = () => {
    const count = item.assetTokenAssets_aggregate?.aggregate?.count ?? 0;
    return count > 1 ? `${count} tokens` : `${count} token`;
  };
  return (
    <>
      {mode === 'selected' && (
        <div>
          <div
            onClick={() => {
              onClickItem?.(item);
            }}
            className={'relative cursor-pointer hover:opacity-80'}
          >
            <div className={'bg-white20 absolute w-full h-full flex justify-center items-center'}>
              <p
                style={{
                  visibility: active ? 'visible' : 'hidden'
                }}
                className={'invisible font-thin bg-dark px-3 py-1 rounded-sm opacity-90'}
              >
                Selected
              </p>
            </div>
            <ItemContent item={item} />
          </div>
          <Link href={getUrl(item)}>
            <a target={'_blank'} rel={'noreferrer'} href={getUrl(item)}>
              <h2 className={'pt-2 font-light text-active'}>{item.name}</h2>
            </a>
          </Link>
          <div className={'flex justify-between'}>
            {item.assetTokenAssets_aggregate?.aggregate?.count ? (
              <p className={'font-light text-xs text-inactive'}>
                <span className={'text-green opacity-70'}>Style</span> / {plural_suggest()}
              </p>
            ) : null}
          </div>
        </div>
      )}
      {mode === 'normal' && (
        <Link href={getUrl(item)}>
          <a href={getUrl(item)}>
            <ItemContent item={item} />
            <h2 className={'pt-2 font-light text-active'}>{item.name}</h2>
            <div className={'flex justify-between'}>
              <p className={'font-light text-xs text-inactive'}>@{item.user?.username ?? item.user?.id}</p>
              {price ? <p className={'text-green'}>{item.__typename === 'tokens' ? `${item.price} ꜩ` : ''}</p> : null}
            </div>
          </a>
        </Link>
      )}
    </>
  );
};

export default Item;
