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
  const { data, loading, fetchMore } = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: ITEMS_PER_PAGE,
      ...variables
    }
  });

  const items = data?.action ?? [];
  // console.log('items:::', items);

  const fetchNextMore = async () => {
    await fetchMore({
      query: query,
      variables: {
        ...variables,
        offset: items.length + ITEMS_PER_PAGE,
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
        let dt = { action: [...(prev['action'] ?? []), ...(fetchMoreResult['action'] ?? [])] };
        return Object.assign({}, prev, dt);
      }
    });
  };

  return (
    <main>
      <section className={`w-full flex flex-col gap-y-1 text-inactive font-thin`}>
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
              {item.kind === IActivityKind.COLLECT_TOKEN && (
                <p>
                  <Link href={`/@${item.issuer.username ?? item.issuer.id}`}>
                    <a href={`/@${item.issuer.username ?? item.issuer.id}`} className={'text-active hover:opacity-80'}>
                      @{item.issuer.username ?? item.issuer.id}
                    </a>
                  </Link>{' '}
                  purchased{' '}
                  <Link href={`/token/${item.token.name}`}>
                    <a href={`/token/${item.token.name}`} className={'text-active hover:opacity-80'}>
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
                  <Link href={`/asset/${item.asset.name}`}>
                    <a href={`/asset/${item.asset.name}`} className={'text-active hover:opacity-80'}>
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
                  <Link href={`/token/${item.token.name}`}>
                    <a href={`/token/${item.token.name}`} className={'text-active hover:opacity-80'}>
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
                  <Link href={`/token/${item.token.name}`}>
                    <a href={`/token/${item.token.name}`} className={'text-active hover:opacity-80'}>
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
                  <Link href={`/token/${item.token.name}`}>
                    <a href={`/token/${item.token.name}`} className={'text-active hover:opacity-80'}>
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
