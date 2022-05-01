import Link from 'next/link';
import { IItem } from '../../types';
import { displayPrice, ipfsToUrl } from '../../utils';
import { IMAGE_MIMETYPES } from '../../constants';
import { useEffect, useRef, useState } from 'react';

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
  const [render, setRender] = useState(false);
  const refItem = useRef<HTMLDivElement | null>(null);
  // TODO different size video,html,png and etc
  // const formats = item.metadata?.formats;
  // const withDim = formats?.filter((a) => a.dimensions);
  // let size = { width: item.width ?? 1000, height: item.height ?? 1000 };
  // if (withDim && (!item.width && !item.height)) {
  //   const dim = withDim[0].dimensions.value;
  //   size.width = parseInt(dim.split('x')[0]);
  //   size.height = parseInt(dim.split('x')[1]);
  // }

  useEffect(() => {
    setRender(true);
  }, [setRender]);

  const w = refItem.current?.clientWidth ?? 100;
  const h = refItem.current?.clientHeight ?? 100;
  return (
    <div className={'item relative'}>
      <div
        ref={refItem}
        className={'relative overflow-hidden'}
        style={{
          display: 'block',
          width: '100%',
          height: '0px',
          paddingBottom: `calc(100% / ${1})`
        }}
      >
        {render &&
          item.metadata?.formats?.map((format) => {
            return (
              <div key={format.mimeType}>
                {IMAGE_MIMETYPES.includes(format.mimeType) ? (
                  <img
                    style={{
                      width: `${w}px`,
                      height: `${h}px`
                    }}
                    className={'object-center object-contain'}
                    src={ipfsToUrl(item.metadata?.thumbnailUri ?? '')}
                    alt={item.name}
                  />
                ) : null}
              </div>
            );
          })}
      </div>
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
              <h2 className={'truncate ... pt-2 text-active'}>{item.name}</h2>
            </a>
          </Link>
          <div className={'flex justify-between text-base'}>
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
              {(item.owner?.verified && item.owner?.id !== item.user?.id) || item.user?.verified ? (
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
              {(item.owner?.verified && item.owner?.id !== item.user?.id) || item.user?.verified ? (
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
            <p className={'whitespace-pre text-white'}>{`${displayPrice(item.offer?.price ?? item.price ?? 0)} ꜩ`}</p>
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
