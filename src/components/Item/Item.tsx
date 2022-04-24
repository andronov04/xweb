import Link from 'next/link';
import { IItem } from '../../types';
import { displayPrice, ipfsToUrl } from '../../utils';
import { IMAGE_MIMETYPES } from '../../constants';
import { useEffect, useMemo } from 'react';

const getUrl = (item: IItem) => {
  if (item.__typename === 'asset') {
    return `/asset/${item.slug ?? item.id}`;
  }
  return `/token/${item.slug ?? item.id}`;
};

interface IItemComp {
  item: IItem;
  mode: 'normal' | 'selected' | 'offer' | 'all';
  onClickItem?: (item: IItem) => void;
  onMountItem?: (item: IItem) => void;
  active?: boolean;
}

const ItemContent = ({ item }: { item: IItem }) => {
  // TODO different size video,html,png and etc
  const formats = item.metadata?.formats;
  const withDim = formats?.filter((a) => a.dimensions);
  const size = { width: 1000, height: 1000 };
  if (withDim) {
    // TODO Use width and height in db
    const dim = withDim[0].dimensions.value;
    size.width = parseInt(dim.split('x')[0]);
    size.height = parseInt(dim.split('x')[1]);
  }
  return (
    <div className={'item relative'}>
      <div
        style={{
          display: 'block',
          width: '1px',
          height: '0px',
          paddingBottom: `calc(100% / ${size.width / size.height})` //`calc(100% / ${item.width / item.height})`,
        }}
      />
      {item.metadata?.formats?.map((format) => {
        // console.log('format', format);
        return (
          <div key={format.mimeType}>
            {IMAGE_MIMETYPES.includes(format.mimeType) ? (
              <img className={'absolute top-0 left-0 w-full h-auto'} src={ipfsToUrl(item.metadata?.thumbnailUri ?? '')} alt={item.name} />
            ) : null}
            {/*<div*/}
            {/*  style={{*/}
            {/*    // paddingTop: '100%',*/}
            {/*    backgroundSize: 'cover',*/}
            {/*    backgroundImage: `url(${ipfsToUrl(item.metadata?.thumbnailUri ?? '')})`*/}
            {/*  }}*/}
            {/*  className={'w-full bg-black rounded-sm '}*/}
            {/*/>*/}
          </div>
        );
      })}
    </div>
  );
};

const Item = ({ item, onMountItem, mode, onClickItem, active }: IItemComp) => {
  useEffect(() => {
    onMountItem?.(item);
  }, [onMountItem, item]);

  const tokens = item.assetTokenAssets_aggregate?.aggregate.count ?? 0;

  return (
    <div className={'font-normal text-lg '}>
      {mode === 'selected' && (
        <div>
          <div
            onClick={() => {
              onClickItem?.(item);
            }}
            className={'relative cursor-pointer hover:opacity-90'}
          >
            <div className={'bg-white20 z-20 absolute w-full h-full flex justify-center items-center'}>
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
            <a className={'hover:opacity-90 cursor-pointer'} target={'_blank'} rel={'noreferrer'} href={getUrl(item)}>
              <h2 className={'pt-2 text-active'}>{item.name}</h2>
            </a>
          </Link>
          <div className={'flex justify-between'}>
            {/*{item.assetTokenAssets_aggregate?.aggregate?.count ? (*/}
            {/*  <p className={'text-xs text-inactive'}>*/}
            {/*    <span className={'text-green opacity-70'}>Style</span> / {plural_suggest()}*/}
            {/*  </p>*/}
            {/*) : null}*/}
          </div>
        </div>
      )}
      {mode === 'normal' && (
        <div className={'overflow-hidden'}>
          <Link href={getUrl(item)}>
            <a href={getUrl(item)}>
              <ItemContent item={item} />
            </a>
          </Link>
          <h2 className={'pt-2 text-active'}>{item.name}</h2>
          <div className={'flex justify-between'}>
            <p className={'text-inactive'}>
              <Link href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                <a className={'hover:opacity-90 cursor-pointer'} href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                  @{item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}
                </a>
              </Link>
            </p>
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
          <h2 className={'pt-2 text-active'}>
            <Link href={getUrl(item)}>
              <a href={getUrl(item)}>{item.name}</a>
            </Link>
          </h2>
          <div className={'flex justify-between items-center'}>
            <div>
              <p className={'text-inactive'}>
                <Link href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                  <a className={'hover:opacity-90 cursor-pointer'} href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                    @{item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}
                  </a>
                </Link>
              </p>
            </div>
            <p className={'text-white'}>{`${displayPrice(item.price ?? 0)} ꜩ`}</p>
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
          <h2 className={'pt-2 text-active'}>{item.name}</h2>
          <div className={'flex justify-between items-center'}>
            <p className={'text-inactive'}>
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
              {/*<Link href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>*/}
              {/*  <a className={'pl-0.5'} href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>*/}
              {/*    @{item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}*/}
              {/*  </a>*/}
              {/*</Link>*/}
            </p>
            {item.offer && <p className={'text-white'}>{`${displayPrice(item.offer.price ?? 0)} ꜩ`}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
