import Link from 'next/link';
import { IItem } from '../../types';
import { ipfsToUrl } from '../../utils';

const getUrl = (item: IItem) => {
  if (item.__typename === 'scripts') {
    return `/style/${item.slug ?? item.id}`;
  }
  return `/art/${item.slug ?? item.id}`;
};

const Item = ({ item, price }: { item: IItem; price?: boolean }) => {
  return (
    <>
      <Link href={getUrl(item)}>
        <a href={getUrl(item)}>
          <div
            style={{
              paddingTop: '100%',
              backgroundSize: 'cover',
              backgroundImage: `url(${ipfsToUrl(item.metadata?.thumbnailUri)})`
            }}
            className={'w-full bg-black rounded-sm '}
          />
          <h2 className={'pt-2 font-light text-active'}>{item.name}</h2>
          <div className={'flex justify-between'}>
            <p className={'font-light text-xs text-inactive'}>@{item.user?.username ?? item.user?.id}</p>
            {price ? <p className={'text-green'}>{item.__typename === 'tokens' ? `${item.price} ꜩ` : ''}</p> : null}
          </div>
        </a>
      </Link>
    </>
  );
};

export default Item;
