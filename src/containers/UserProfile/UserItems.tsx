import { DocumentNode, useQuery } from '@apollo/client';
import { ITEMS_PER_PAGE } from '../../constants';
import Loader from '../../components/Utils/Loader';
import { IItem, IUser } from '../../types';
import { useMemo } from 'react';
import Items from '../Items/Items';

export interface IUserItemsVariables {
  [key: string]: string | number;
}

interface IUserItems {
  user: IUser;
  query: DocumentNode;
  variables: IUserItemsVariables;
  price: boolean;
}

const UserItems = ({ user, query, price, variables }: IUserItems) => {
  const { data, loading, fetchMore, refetch } = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: ITEMS_PER_PAGE,
      ...variables
    }
  });
  const items = useMemo<IItem[]>(() => {
    const items = (data?.scripts ?? []).concat(data?.tokens ?? []);
    return items.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  }, [data]);

  return (
    <main>
      {loading && <Loader className={'mt-32'} />}
      <Items items={items} price={price} />
    </main>
  );
};

export default UserItems;
