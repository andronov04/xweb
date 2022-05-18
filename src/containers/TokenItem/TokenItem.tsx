import Link from 'next/link';
import { IItem, IToken, ITokenFlag } from '../../types';
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
import ItemToken from '../../components/Item/ItemToken';
import { mimeMap } from '../../utils/mime';
import Footnote from '../../components/Library/Footnote/Footnote';

const TokenItem = ({ item }: { item: IToken }) => {
  const router = useRouter();
  const currentUser = useStore((state) => state.user);

  const isActivity = router.asPath.endsWith('activity');
  const isAssets = router.asPath.endsWith('assets');
  const isCurrent = !isActivity && !isAssets;

  return (
    <section>
      <div className={'flex flex-col gap-y-1 w-full mb-4'}>
        {item.flag !== ITokenFlag.NONE && (
          <Footnote type={item.flag === ITokenFlag.REVIEW ? 'info' : 'error'}>
            {item.flag === ITokenFlag.BANNED && <p>Blocked. This token violates our Code of Conduct.</p>}
            {item.flag === ITokenFlag.REVIEW && <p>In moderation. This token is undergoing moderation.</p>}
          </Footnote>
        )}
        {!item.enabled ? (
          <Footnote type={'warning'}>
            <p>This token is disabled</p>
          </Footnote>
        ) : null}
      </div>
      <div className={'flex w-full items-start md:flex-row flex-col gap-x-8'}>
        <div className={'md:w-1/2 w-full'}>
          <ItemToken item={item as IItem} formats={true} />
        </div>
        <div className={'md:w-1/2 w-full flex-grow'}>
          <div>
            <h1 className={'text-active text-2xl'}>
              {item.name}
              <span className={'hidden'}> {item.id}</span>
            </h1>
            <p className={'  text-inactive text-base'}>
              Owned by{' '}
              <Link href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                <a className={'text-active hover:text-inactive'} href={`/@${item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}`}>
                  @{item.owner?.username || item.owner?.id || item.user?.username || item.user?.id}
                </a>
              </Link>
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
            </p>
            <p style={{ overflowWrap: 'break-word' }} className={'text-inactive text-lg pt-8'}>
              {item.description}
            </p>
          </div>

          {item.metadata?.isTransferable && (
            <div className={'mt-10'}>
              <ConditionRender client>
                <>
                  {(currentUser?.id === item.user?.id && item?.owner?.id === undefined) || currentUser?.id === item.owner?.id ? (
                    <TradeAction item={item} />
                  ) : item.offer ? (
                    <PurchaseAction item={item} />
                  ) : null}
                </>
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
        <ConditionRender client>
          <div>
            <Items kind={'asset'} query={QL_GET_ASSET_ITEMS_BY_TOKEN} variables={{ tokenId: item.id }} />
          </div>
        </ConditionRender>
      ) : null}

      {isActivity ? (
        <div>
          <ConditionRender client>
            <Activity query={QL_GET_ACTION_BY_TOKEN} variables={{ tokenId: item.id }} />
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
          {item.metadata?.formats?.length ? (
            <div className={'flex'}>
              <div className={'pr-1'}>Formats: </div>
              <div className={'text-inactive flex gap-x-1'}>
                {item.metadata?.formats.map((frmt, i) => (
                  <div key={frmt.mimeType}>
                    {mimeMap[frmt.mimeType] ?? 'UNKNOWN'}{' '}
                    <span>
                      (
                      <Link href={ipfsToUrl(frmt.uri)}>
                        <a className={'text-active cursor-pointer: hover:opacity-80'} href={ipfsToUrl(frmt.uri)} target={'_blank'} rel={'noreferrer'}>
                          Open original
                        </a>
                      </Link>
                      {/*/{' '}*/}
                      {/*<Link href={'.'}>*/}
                      {/*  <a className={'text-active cursor-pointer: hover:opacity-80'} href={'.'} target={'_blank'} rel={'noreferrer'}>*/}
                      {/*    Download*/}
                      {/*  </a>*/}
                      {/*</Link>*/})
                    </span>
                    {(item.metadata?.formats?.length ?? 0) - 1 !== i ? ',' : ''}
                  </div>
                ))}
              </div>
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
    </section>
  );
};

export default TokenItem;
