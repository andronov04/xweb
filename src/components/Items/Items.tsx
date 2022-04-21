import { useQuery } from '@apollo/client';
import { ITEMS_PER_PAGE } from '../../constants';
import Item from '../Item/Item';
import { DocumentNode } from '@apollo/client/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Utils/Loader';
import { IItem } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from '../../hooks/use-resized/useWindowSize';

interface IVariable {
  [key: string]: any;
}

interface IItems {
  variables?: IVariable;
  query: DocumentNode;
  kind: string | string[];
  mode?: 'normal' | 'selected' | 'offer' | 'all';
  onClickItem?: (item: IItem) => void;
  onMountItem?: (item: IItem) => void;
  activeIds?: number[];
}

const Items = ({ variables, mode, query, kind, onClickItem, onMountItem, activeIds }: IItems) => {
  const size = useWindowSize();
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, fetchMore } = useQuery(query, {
    //, fetchMore, refetch
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'no-cache',
    variables: {
      offset: 0,
      limit: ITEMS_PER_PAGE,
      ...variables
    }
  });

  const list = useMemo(() => {
    let array: any[] = [];
    if (typeof kind === 'string') {
      array = data?.[kind] ?? [];
    } else {
      kind.forEach((knd) => {
        array.push(data?.[knd] ?? []);
      });
      array = array.flat();
    }
    return array;
  }, [data, kind]);

  useEffect(() => {
    if (data && list.length < ITEMS_PER_PAGE) {
      setHasMore(false);
    }
  }, [list, data]);

  const fetchNextMore = async () => {
    await fetchMore({
      query: query,
      variables: {
        ...variables,
        offset: list.length + ITEMS_PER_PAGE,
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
        let dt = {};
        if (typeof kind === 'string') {
          dt = { ...dt, [kind]: [...(prev[kind] ?? []), ...(fetchMoreResult[kind] ?? [])] };
        } else {
          kind.forEach((knd) => {
            dt = { ...dt, [knd]: [...(prev[knd] ?? []), ...(fetchMoreResult[knd] ?? [])] };
          });
        }
        return Object.assign({}, prev, dt);
      }
    });
  };

  // const items = useMemo<IItem[]>(() => {
  //   const _items = data?.[kind] ?? [];  // (data?.scripts ?? []).concat(data?.tokens ?? []);
  //   return items.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  // }, [data]);
  const items = useMemo(() => {
    let array = list;
    if (kind === 'offer') {
      // map offer to item format
      array = array.map((a) => {
        return {
          ...a.token,
          offerId: a.id,
          price: a.price
        };
      });
    }
    return array;
  }, [list, kind]);

  const column = useMemo(() => {
    let count = 4;
    // if ((size.width ?? 0) >= 1280) {
    //   count = 5;
    // }
    if ((size.width ?? 0) <= 868) {
      count = 2;
    }
    if ((size.width ?? 0) <= 640) {
      count = 1;
    }
    return count;
  }, [size]);

  const structure = useMemo(() => {
    const blocks: IItem[][] = new Array(column).fill(Boolean).map((_) => []);
    let idx = 0;
    (items ?? [])
      .slice()
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
      .forEach((item) => {
        if (idx === column) {
          idx = 0;
        }
        blocks[idx].push(item);
        idx += 1;
      });
    return blocks;
  }, [items, column]);

  return (
    <main>
      {/*{loading && <Loader className={'mt-32'} />}*/}
      <InfiniteScroll
        dataLength={structure.flat().length}
        next={async () => {
          await fetchNextMore();
        }}
        hasMore={hasMore}
        endMessage={<div />}
        loader={<Loader className={'mt-32'} />}
      >
        <section className={`flex columns-${column} w-full justify-between`}>
          {structure.map((items, i) => (
            <div
              key={i}
              style={{
                width: `calc((100% - (20px * (${column} - 1))) / ${column})`
              }}
              className={'flex-col flex gap-y-4'}
            >
              {items.map((item) => (
                <Item
                  onClickItem={onClickItem}
                  onMountItem={onMountItem}
                  mode={mode ?? 'normal'}
                  active={activeIds?.includes(item.id)}
                  key={`${item.id}_${item.slug}`}
                  item={item}
                />
              ))}
            </div>
          ))}
        </section>
      </InfiniteScroll>
    </main>
  );
};
//<section className={'block lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-cols-3 h-full gap-6 w-full'}>

export default Items;
