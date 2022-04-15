import { displayRoyalty, ipfsToUrl } from '../../utils';
import Spacing from '../../components/Spacing/Spacing';
import { IAsset } from '../../types';
import Link from 'next/link';
import CustomButton from '../../components/CustomButton/CustomButton';
import Navs from '../../components/Navs/Navs';
import ConditionRender from 'src/components/Utils/ConditionRender';
import { useRouter } from 'next/router';
import Activity from '../../components/Activity/Activity';
import { QL_GET_ACTION_BY_ASSET, QL_GET_TOKEN_ITEMS, QL_GET_TOKEN_ITEMS_BY_ASSET } from '../../api/queries';
import Items from '../../components/Items/Items';

const AssetItem = ({ item }: { item: IAsset }) => {
  const router = useRouter();
  const user = item.user?.username ?? item.user?.id;

  const isActivity = router.asPath.endsWith('activity');
  const isDetails = router.asPath.endsWith('details');
  const isCurrent = !isActivity && !isDetails;

  console.log('item:::', item);

  return (
    <section>
      <div className={'flex w-full items-center md:flex-row flex-col gap-x-8'}>
        <div className={'flex-grow flex h-96 flex-col justify-between'}>
          <div>
            <div>
              <h1 className={'text-active text-2xl'}>{item.name}</h1>
              <p className={'text-inactive text-sm'}>
                {item.kind === 1 ? 'Style' : ''} by{' '}
                <Link href={`/@${user}`}>
                  <a className={'text-active hover:text-inactive'} href={`/@${user}`}>
                    @{user}
                  </a>
                </Link>
              </p>
              <p className={'text-inactive pt-8 font-light'}>{item.description}</p>
              {/*<span className={'font-light text-sm text-white30 mt-3'}>{item.created ? new Date(item.created).toLocaleDateString('en-US') : null}</span>*/}
            </div>
          </div>
          <div className={'flex justify-end text-right'}>
            <div>
              {/*{item.count_tokens ? (*/}
              {/*  <p className={'font-light pb-1 text-inactive text-sm'}>*/}
              {/*    {item.count_tokens} {(item.count_tokens || 0) <= 1 ? 'art' : 'arts'}*/}
              {/*  </p>*/}
              {/*) : null}*/}
              <CustomButton style={'white'} classNames={'bg-active text-dark hover:bg-inactive'} value={'Create token'} />
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${ipfsToUrl(item.metadata?.displayUri ?? '')})`
            }}
            className={'w-96 h-96 rounded-sm'}
          />
        </div>
      </div>

      <Spacing size={3} />

      <div>
        <Navs
          links={[
            { url: `/asset/${item.slug ?? item.id}`, active: isCurrent, displayName: 'Recently created', pathname: '/asset/[id]' },
            { url: `/asset/${item.slug ?? item.id}/details`, active: isDetails, displayName: 'Details', pathname: '/asset/[id]/details' },
            { url: `/asset/${item.slug ?? item.id}/activity`, active: isActivity, displayName: 'Activity', startsWith: '/asset/[id]/activity' }
          ]}
        />
      </div>

      <Spacing size={1.2} />

      {isActivity ? (
        <div>
          <ConditionRender client>
            <Activity query={QL_GET_ACTION_BY_ASSET} variables={{ assetId: item.id }} />
          </ConditionRender>
        </div>
      ) : null}

      {isDetails ? (
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
                <Link href={'ff'}>
                  <a target={'_blank'} rel={'noreferrer'} href={ipfsToUrl(item.metadataUri)} className={'text-active hover:text-inactive'}>
                    view on IPFS
                  </a>
                </Link>
              </span>
            </div>
          )}
        </div>
      ) : null}

      {isCurrent ? (
        <div>
          <Items kind={'token'} query={QL_GET_TOKEN_ITEMS_BY_ASSET} variables={{ assetId: item.id }} />
        </div>
      ) : null}
      {/*<ConditionRender client>*/}
      {/*  <AssetTokens item={item} />*/}
      {/*</ConditionRender>*/}
    </section>
  );
};

export default AssetItem;
