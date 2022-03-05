import { IItem, IScript } from '../../types';
import { useQuery } from '@apollo/client';
import { ITEMS_PER_PAGE } from '../../constants';
import { QL_GET_TOKEN_ITEMS_BY_SCRIPT } from '../../api/queries';
import { useMemo } from 'react';
import Items from '../Items/Items';

const ScriptArtsItem = ({ item }: { item: IScript }) => {
  const { data, loading, fetchMore, refetch } = useQuery(QL_GET_TOKEN_ITEMS_BY_SCRIPT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      script_id: item.id,
      limit: ITEMS_PER_PAGE
    }
  });

  const items = useMemo<IItem[]>(() => {
    const items = (data?.scripts ?? []).concat(data?.tokens ?? []);
    return items.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  }, [data]);

  return <Items items={items} />;
};

export default ScriptArtsItem;
