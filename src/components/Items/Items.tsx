import { useQuery } from '@apollo/client';
import { ITEMS_PER_PAGE } from '../../constants';
import Item from '../Item/Item';
import { DocumentNode } from '@apollo/client/core';
import Loader from '../Utils/Loader';
import { IItem } from '../../types';
import { useMemo } from 'react';
import { useWindowSize } from '../../hooks/use-resized/useWindowSize';

interface IVariable {
  [key: string]: string | number;
}

interface IItems {
  variables?: IVariable;
  query: DocumentNode;
  kind: string;
  mode?: 'normal' | 'selected' | 'offer';
  onClickItem?: (item: IItem) => void;
  activeIds?: number[];
}

const Items = ({ variables, mode, query, kind, onClickItem, activeIds }: IItems) => {
  const size = useWindowSize();
  const { data, loading } = useQuery(query, {
    //, fetchMore, refetch
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: ITEMS_PER_PAGE,
      ...variables
    }
  });

  // const items = useMemo<IItem[]>(() => {
  //   const _items = data?.[kind] ?? [];  // (data?.scripts ?? []).concat(data?.tokens ?? []);
  //   return items.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  // }, [data]);
  const items = useMemo(() => {
    let array = data?.[kind] ?? [];
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
  }, [data, kind]);
  // console.log('items:::', items);

  const column = useMemo(() => {
    let count = 3;
    if ((size.width ?? 0) >= 1280) {
      count = 5;
    }
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
    items.forEach((item) => {
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
      {loading && <Loader className={'mt-32'} />}
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
              <Item onClickItem={onClickItem} mode={mode ?? 'normal'} active={activeIds?.includes(item.id)} key={`${item.id}_${item.slug}`} item={item} />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
};
//<section className={'block lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-cols-3 h-full gap-6 w-full'}>

export default Items;
