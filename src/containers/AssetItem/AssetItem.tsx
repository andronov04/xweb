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
import AssetAction from './AssetAction';

const AssetItem = ({ item }: { item: IAsset }) => {
  const router = useRouter();
  const currentUser = useStore((state) => state.user);
  const user = item.user?.username ?? item.user?.id;

  const isActivity = router.asPath.endsWith('activity');
  const isDetails = router.asPath.endsWith('details');
  const isCurrent = !isActivity && !isDetails;

  const tokens = item.assetTokenAssets_aggregate?.aggregate.count ?? 0;

  return (
    <section>
      <div className={'flex flex-col gap-y-1 w-full mb-4'}>
        {item.flag !== IAssetFlag.NONE && (
          <Footnote type={item.flag === IAssetFlag.REVIEW ? 'info' : item.flag === IAssetFlag.HIDDEN ? 'warning' : 'error'}>
            {item.flag === IAssetFlag.BANNED && <p>Blocked. This asset violates our Code of Conduct.</p>}
            {item.flag === IAssetFlag.REVIEW && <p>In moderation. This asset is undergoing moderation.</p>}
            {item.flag === IAssetFlag.HIDDEN && <p>Hidden. This asset is hidden from everyone.</p>}
          </Footnote>
        )}
        {!item.enabled ? (
          <Footnote type={'warning'}>
            <p>This asset is disabled</p>
          </Footnote>
        ) : null}
      </div>
      <div className={'flex w-full items-center md:flex-row flex-col-reverse gap-x-8'}>
        <div className={'flex-grow flex md:h-96 h-auto md:w-1/2 w-full flex-col justify-between'}>
          <div>
            <div>
              <h1 className={'text-active text-2xl'}>
                {item.name}
                <span className={'hidden'}> {item.id}</span>
              </h1>
              <p className={'text-inactive text-base'}>
                {tokens ? (
                  <span>
                    {tokens} {tokens > 1 ? 'tokens' : 'token'}
                  </span>
                ) : null}
              </p>
              <p style={{ overflowWrap: 'break-word' }} className={'text-inactive text-lg pt-8'}>
                {item.description}
              </p>
              {/*<span className={'text-sm text-white30 mt-3'}>{item.created ? new Date(item.created).toLocaleDateString('en-US') : null}</span>*/}
            </div>
          </div>
          <div className={'flex gap-x-3 justify-end text-right'}>
            {/*<ConditionRender client={true}>*/}
            {/*  <div>*/}
            {/*    {(currentUser?.role === IUserRole.ADMIN || currentUser?.role === IUserRole.MODERATOR) && item.flag === IAssetFlag.REVIEW && (*/}
            {/*      <AssetItemApprove item={item} />*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*</ConditionRender>*/}

            <div className={'flex gap-x-3'}>
              {item.user?.id === currentUser?.id ? <AssetAction item={item} /> : null}

              <CustomButton
                disabled={item.flag !== IAssetFlag.NONE || !item.enabled}
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
          <ItemToken align={'right'} formats={true} item={item as IItem} />
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
        <div className={'flex md:text-base text-sm gap-y-1 flex-col text-inactive'}>
          <div className={'flex'}>
            <span className={'pr-1'}>ID: </span>
            <span>
              <Link href={`/a/${item.id}`}>
                <a href={`/a/${item.id}`} className={'text-active hover:text-inactive'}>
                  {item.id}
                </a>
              </Link>
            </span>
          </div>
          <div className={'flex'}>
            <span className={'pr-1'}>Published: </span>
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
              {item.user?.verified ? (
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
            </span>
          </div>
        </div>
      ) : null}

      {isCurrent ? (
        <div>
          <ConditionRender client>
            <Items kind={'token'} query={QL_GET_TOKEN_ITEMS_BY_ASSET} variables={{ assetId: item.id }} />
          </ConditionRender>
        </div>
      ) : null}
      {/*<ConditionRender client>*/}
      {/*  <AssetTokens item={item} />*/}
      {/*</ConditionRender>*/}
    </section>
  );
};

export default AssetItem;
