import { useQuery } from '@apollo/client';
import { ITEMS_PER_PAGE } from '../../constants';
import Item from '../Item/Item';
import { DocumentNode } from '@apollo/client/core';
import Loader from '../Utils/Loader';
import { IItem } from '../../types';

interface IVariable {
  (key: string): string | number;
}

interface IItems {
  variables?: IVariable;
  query: DocumentNode;
  kind: string;
  mode?: 'normal' | 'selected';
  onClickItem?: (item: IItem) => void;
  activeIds?: number[];
}

const Items = ({ variables, mode, query, kind, onClickItem, activeIds }: IItems) => {
  const { data, loading, fetchMore, refetch } = useQuery(query, {
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
  const items = data?.[kind] ?? [];
  // console.log('items:::', items);

  return (
    <main>
      {loading && <Loader className={'mt-32'} />}
      <section className={'grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-cols-3 h-full gap-6 w-full'}>
        {items.map((item) => (
          <Item onClickItem={onClickItem} mode={mode ?? 'normal'} active={activeIds?.includes(item.id)} key={`${item.id}_${item.slug}`} item={item} />
        ))}
      </section>
    </main>
  );
};

export default Items;
