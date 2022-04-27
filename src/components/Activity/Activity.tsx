import { useQuery } from '@apollo/client';
import { ITEMS_PER_PAGE, TZKT_URL } from '../../constants';
import { DocumentNode } from '@apollo/client/core';
import Loader from '../Utils/Loader';
import { IActivityKind } from '../../types/activity';
import ReactTimeAgo from 'react-time-ago';
import Link from 'next/link';
import { displayPrice } from '../../utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { IAssetFlag, ITokenFlag } from '../../types';

interface IVariable {
  [key: string]: string | number;
}

interface IItems {
  variables?: IVariable;
  query: DocumentNode;
}

const TimeActivity = ({ item }: { item: any }) => {
  return (
    <div>
      <Link href={`${TZKT_URL}${item.opHash}`}>
        <a target={'_blank'} rel={'noreferrer'} href={`${TZKT_URL}${item.opHash}`} className={'text-active hover:opacity-80'}>
          <ReactTimeAgo date={new Date(item.created)} locale="en-US" />
        </a>
      </Link>
    </div>
  );
};

const Activity = ({ variables, query }: IItems) => {
  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'no-cache', // TODO Good check with cache pagination
    variables: {
      offset: 0,
      limit: ITEMS_PER_PAGE,
      ...variables
    }
  });

  const items = data?.action ?? [];
  // TODO IF empty

  const fetchNextMore = async () => {
    await fetchMore({
      query: query,
      variables: {
        ...variables,
        offset: items.length,
        limit: ITEMS_PER_PAGE
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          setHasMore(false);
          return prev;
        }
        const count = Object.keys(fetchMoreResult)
          .map((a) => fetchMoreResult[a]?.length)
          .reduce((a, b) => a + b);
        if (count === 0) {
          setHasMore(false);
          return prev;
        }
        const dt = { action: [...(prev['action'] ?? []), ...(fetchMoreResult['action'] ?? [])] };
        return Object.assign({}, prev, dt);
      }
    });
  };

  return (
    <main>
      <section className={`w-full md:text-base text-xs flex flex-col gap-y-1 text-inactive font-normal`}>
        <InfiniteScroll
          dataLength={items.length}
          next={async () => {
            await fetchNextMore();
          }}
          hasMore={hasMore}
          endMessage={<div />}
          loader={<Loader className={'mt-32'} />}
        >
          {items.map((item) => (
            <div key={item.id} className={'flex w-full justify-between'}>
              {item.kind === IActivityKind.CHANGE_STATUS_ASSET && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  changed status to{' '}
                  <span className={'text-active'}>
                    {item.data.status === IAssetFlag.NONE ? '"published"' : null}
                    {item.data.status === IAssetFlag.REVIEW ? '"in moderation"' : null}
                    {item.data.status === IAssetFlag.BANNED ? '"blocked"' : null}
                    {item.data.status === IAssetFlag.HIDDEN ? '"hidden"' : null}
                  </span>
                </p>
              )}
              {item.kind === IActivityKind.CHANGE_STATUS_TOKEN && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  changed status to{' '}
                  <span className={'text-active'}>
                    {item.data.status === ITokenFlag.NONE ? '"published"' : null}
                    {item.data.status === ITokenFlag.REVIEW ? '"in moderation"' : null}
                    {item.data.status === ITokenFlag.BANNED ? '"blocked"' : null}
                  </span>
                </p>
              )}
              {item.kind === IActivityKind.UPDATE_PROFILE && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  updated profile
                </p>
              )}
              {item.kind === IActivityKind.TRANSFER_TOKEN && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  transferred{' '}
                  <Link href={`/token/${item.token.slug}`}>
                    <a href={`/token/${item.token.slug}`} className={'text-active hover:opacity-80'}>
                      {item.token.name}
                    </a>
                  </Link>{' '}
                  to{' '}
                  <Link href={`/@${item.target.username ?? item.target.id}`}>
                    <a href={`/@${item.target.username ?? item.target.id}`} className={'text-active hover:opacity-80'}>
                      @{item.target.username ?? item.target.id}
                    </a>
                  </Link>
                </p>
              )}
              {item.kind === IActivityKind.USED_ASSET && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  used{' '}
                  <Link href={`/asset/${item.asset.slug}`}>
                    <a href={`/asset/${item.asset.slug}`} className={'text-active hover:opacity-80'}>
                      {item.asset.name}
                    </a>
                  </Link>{' '}
                  to create{' '}
                  <Link href={`/token/${item.token.slug}`}>
                    <a href={`/token/${item.token.slug}`} className={'text-active hover:opacity-80'}>
                      {item.token.name}
                    </a>
                  </Link>
                </p>
              )}
              {item.kind === IActivityKind.COLLECT_TOKEN && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  purchased{' '}
                  <Link href={`/token/${item.token.slug}`}>
                    <a href={`/token/${item.token.slug}`} className={'text-active hover:opacity-80'}>
                      {item.token.name}
                    </a>
                  </Link>{' '}
                  for {displayPrice(item.data?.price ?? 0)} ꜩ
                </p>
              )}
              {item.kind === IActivityKind.CREATE_ASSET && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  created{' '}
                  <Link href={`/asset/${item.asset.slug}`}>
                    <a href={`/asset/${item.asset.slug}`} className={'text-active hover:opacity-80'}>
                      {item.asset.name}
                    </a>
                  </Link>
                </p>
              )}
              {item.kind === IActivityKind.CREATE_TOKEN && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  minted{' '}
                  <Link href={`/token/${item.token.slug}`}>
                    <a href={`/token/${item.token.slug}`} className={'text-active hover:opacity-80'}>
                      {item.token.name}
                    </a>
                  </Link>
                </p>
              )}
              {item.kind === IActivityKind.LISTED_TOKEN && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  listed{' '}
                  <Link href={`/token/${item.token.slug}`}>
                    <a href={`/token/${item.token.slug}`} className={'text-active hover:opacity-80'}>
                      {item.token.name}
                    </a>
                  </Link>{' '}
                  for {displayPrice(item.data?.price ?? 0)} ꜩ
                </p>
              )}
              {item.kind === IActivityKind.CANCEL_LISTED_TOKEN && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  cancelled listing{' '}
                  <Link href={`/token/${item.token.slug}`}>
                    <a href={`/token/${item.token.slug}`} className={'text-active hover:opacity-80'}>
                      {item.token.name}
                    </a>
                  </Link>
                </p>
              )}
              <TimeActivity item={item} />
            </div>
          ))}
        </InfiniteScroll>
      </section>
    </main>
  );
};

export default Activity;
