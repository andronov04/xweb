import { displayRoyalty, ipfsToUrl } from '../../utils';
import Spacing from '../../components/Spacing/Spacing';
import { IAsset, IAssetFlag, IItem, IUserRole } from '../../types';
import Link from 'next/link';
import CustomButton from '../../components/CustomButton/CustomButton';
import Navs from '../../components/Navs/Navs';
import ConditionRender from 'src/components/Utils/ConditionRender';
import { useRouter } from 'next/router';
import Activity from '../../components/Activity/Activity';
import { QL_GET_ACTION_BY_ASSET, QL_GET_TOKEN_ITEMS_BY_ASSET } from '../../api/queries';
import Items from '../../components/Items/Items';
import { useStore } from '../../store';
import AssetItemApprove from './AssetItemApprove';
import ItemToken from '../../components/Item/ItemToken';
import Footnote from '../../components/Library/Footnote/Footnote';

const AssetItem = ({ item }: { item: IAsset }) => {
  const router = useRouter();
  const currentUser = useStore((state) => state.user);
  const user = item.user?.username ?? item.user?.id;

  const isActivity = router.asPath.endsWith('activity');
  const isTokens = router.asPath.endsWith('tokens');
  const isCurrent = !isActivity && !isTokens;

  // console.log('item:::', item);
  // console.log('currentUser:::', currentUser);
  const tokens = item.assetTokenAssets_aggregate?.aggregate.count ?? 0;

  // TODO All flags
  return (
    <section>
      {item.flag !== IAssetFlag.NONE && (
        <Footnote type={item.flag === IAssetFlag.REVIEW ? 'info' : item.flag === IAssetFlag.HIDDEN ? 'warning' : 'error'}>
          {item.flag === IAssetFlag.BANNED && <p>Banned</p>}
          {item.flag === IAssetFlag.REVIEW && <p>Under Review</p>}
          {item.flag === IAssetFlag.HIDDEN && <p>Hidden</p>}
        </Footnote>
      )}
      <div className={'flex w-full items-center md:flex-row flex-col-reverse gap-x-8'}>
        <div className={'flex-grow flex md:h-96 h-auto md:w-auto w-full flex-col justify-between'}>
          <div>
            <div>
              <h1 className={'text-active text-2xl'}>{item.name}</h1>
              <p className={'text-inactive text-base'}>
                {tokens ? (
                  <span>
                    {tokens} {tokens > 1 ? 'tokens' : 'token'}
                  </span>
                ) : null}
              </p>
              <p className={'text-inactive text-lg pt-8'}>{item.description}</p>
              {/*<span className={'text-sm text-white30 mt-3'}>{item.created ? new Date(item.created).toLocaleDateString('en-US') : null}</span>*/}
            </div>
          </div>
          <div className={'flex gap-x-3 justify-end text-right'}>
            <ConditionRender client={true}>
              <div>
                {(currentUser?.role === IUserRole.ADMIN || currentUser?.role === IUserRole.MODERATOR) && item.flag === IAssetFlag.REVIEW && (
                  <AssetItemApprove item={item} />
                )}
              </div>
            </ConditionRender>

            <div>
              {/*{item.count_tokens ? (*/}
              {/*  <p className={'pb-1 text-inactive text-sm'}>*/}
              {/*    {item.count_tokens} {(item.count_tokens || 0) <= 1 ? 'art' : 'arts'}*/}
              {/*  </p>*/}
              {/*) : null}*/}
              <CustomButton
                disabled={item.flag !== IAssetFlag.NONE}
                style={'white'}
                onClick={() => {
                  if (item.flag === IAssetFlag.NONE) {
                    router.push(`/create/token?a=${item.id}`).then();
                  }
                }}
                classNames={'bg-active text-dark hover:bg-inactive'}
                value={'Create token'}
              />
            </div>
          </div>
        </div>
        <div className={'md:w-1/2 w-full md:h-96 h-auto'}>
          <ItemToken align={'right'} item={item as IItem} />
        </div>
        {/*<div>*/}
        {/*  <div*/}
        {/*    style={{*/}
        {/*      backgroundSize: 'cover',*/}
        {/*      backgroundImage: `url(${ipfsToUrl(item.metadata?.displayUri ?? '')})`*/}
        {/*    }}*/}
        {/*    className={'w-96 h-96 rounded-sm'}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>

      <Spacing size={3} />

      <div>
        <Navs
          links={[
            { url: `/asset/${item.slug ?? item.id}/tokens`, active: isTokens, displayName: 'Recently created', pathname: '/asset/[id]/tokens' },
            { url: `/asset/${item.slug ?? item.id}`, active: isCurrent, displayName: 'Details', pathname: '/asset/[id]' },
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

      {isCurrent ? (
        <div className={'flex md:text-base text-sm gap-y-1 flex-col text-inactive'}>
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
              <span className={'text-inactive'}>{item.tags.join(', ')}</span>
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

      {isTokens ? (
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
