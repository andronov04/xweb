import Link from 'next/link';
import { IToken } from '../../types';
import { displayRoyalty, ipfsToUrl } from '../../utils';
import Spacing from '../../components/Spacing/Spacing';
import Navs from 'src/components/Navs/Navs';
import ConditionRender from '../../components/Utils/ConditionRender';
import TradeAction from '../TradeAction/TradeAction';
import { useStore } from '../../store';
import PurchaseAction from '../PurchaseAction/PurchaseAction';
import { useRouter } from 'next/router';
import Activity from '../../components/Activity/Activity';
import { QL_GET_ACTION_BY_TOKEN, QL_GET_ASSET_ITEMS_BY_TOKEN } from '../../api/queries';
import Items from '../../components/Items/Items';

const TokenItem = ({ item }: { item: IToken }) => {
  const router = useRouter();
  const currentUser = useStore((state) => state.user);
  const user = item.user?.username ?? item.user?.id;

  const isActivity = router.asPath.endsWith('activity');
  const isAssets = router.asPath.endsWith('assets');
  const isCurrent = !isActivity && !isAssets;

  console.log('item:::', item);

  return (
    <section>
      <div className={'flex w-full items-start md:flex-row flex-col gap-x-8'}>
        <div>
          <div
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${ipfsToUrl(item.metadata?.displayUri ?? '')})`
            }}
            className={'w-96 h-96 rounded-sm'}
          />
        </div>
        <div className={'flex-grow'}>
          <div>
            <h1 className={'text-active text-2xl'}>{item.name}</h1>
            <p className={'text-inactive text-sm'}>
              Owned by{' '}
              <Link href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                <a className={'text-active hover:text-inactive'} href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                  @{item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}
                </a>
              </Link>
            </p>
            <p className={'text-inactive pt-8 font-light'}>{item.description}</p>
          </div>

          {item.metadata?.isTransferable && (
            <div className={'mt-10'}>
              <ConditionRender client>
                {(currentUser?.id === item.user?.id && item?.owner?.id === undefined) || currentUser?.id === item.owner?.id ? (
                  <TradeAction item={item} />
                ) : (
                  item.offer && <PurchaseAction item={item} />
                )}
              </ConditionRender>
            </div>
          )}
        </div>
      </div>

      <Spacing size={3} />

      <div>
        <Navs
          links={[
            { url: `/token/${item.slug ?? item.id}/assets`, active: isAssets, displayName: 'Created with', pathname: '/token/[id]/assets' },
            { url: `/token/${item.slug ?? item.id}`, active: isCurrent, displayName: 'Details', pathname: '/token/[id]' },
            { url: `/token/${item.slug ?? item.id}/activity`, active: isActivity, displayName: 'Activity', startsWith: '/token/[id]/activity' }
          ]}
        />
      </div>

      <Spacing size={1.2} />

      {isAssets ? (
        <div>
          <Items kind={'asset'} query={QL_GET_ASSET_ITEMS_BY_TOKEN} variables={{ tokenId: item.id }} />
        </div>
      ) : null}

      {isActivity ? (
        <div>
          <ConditionRender client>
            <Activity query={QL_GET_ACTION_BY_TOKEN} variables={{ tokenId: item.id }} />
          </ConditionRender>
        </div>
      ) : null}

      {isCurrent ? (
        <div className={'flex gap-y-1 flex-col font-light text-inactive'}>
          <div className={'flex'}>
            <span className={'pr-1'}>Minted: </span>
            <span>{item.created ? new Date(item.created).toLocaleDateString('en-US') : null}</span>
          </div>
          {item.royalties !== undefined ? (
            <div className={'flex'}>
              <span className={'pr-1'}>Royalties: </span>
              <span>{displayRoyalty(item.royalties)}</span>
            </div>
          ) : null}
          {item.tags?.length ? (
            <div className={'flex'}>
              <span className={'pr-1'}>Tags: </span>
              <span className={'text-active'}>{item.tags.join(', ')}</span>
            </div>
          ) : null}
          {item.metadataUri && (
            <div className={'flex'}>
              <span className={'pr-1'}>Metadata: </span>
              <span>
                <Link href={ipfsToUrl(item.metadataUri)}>
                  <a target={'_blank'} rel={'noreferrer'} href={ipfsToUrl(item.metadataUri)} className={'text-active hover:text-inactive'}>
                    view on IPFS
                  </a>
                </Link>
              </span>
            </div>
          )}
          <div className={'flex'}>
            <span className={'pr-1'}>Creator: </span>
            <span>
              <Link href={`/@${item.user?.username || item.user?.id}`}>
                <a href={`/@${item.user?.username || item.user?.id}`} className={'text-active hover:text-inactive'}>
                  @{item.user?.username || item.user?.id}
                </a>
              </Link>
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default TokenItem;
