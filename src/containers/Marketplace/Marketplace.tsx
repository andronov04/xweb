import { useQuery } from '@apollo/client';
import { ITEMS_PER_PAGE } from '../../constants';
import { QL_GET_SALES_TOKENS } from '../../api/queries';
import Loader from '../../components/Utils/Loader';
import { IItem } from '../../types';
import { useMemo } from 'react';
// import Items from '../Items/Items';

const Marketplace = () => {
  const { data, loading, fetchMore, refetch } = useQuery(QL_GET_SALES_TOKENS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: ITEMS_PER_PAGE
    }
  });
  const items = useMemo<IItem[]>(() => {
    const items = (data?.scripts ?? []).concat(data?.tokens ?? []);
    return items.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  }, [data]);

  return (
    <main>
      {loading && <Loader className={'mt-32'} />}
      {!loading && (
        <div className={'flex justify-between'}>
          <div className={'text-inactive'}>listed arts</div>
          <div>
            <p className={'italic text-whitegrey'}>recently listed</p>
          </div>
        </div>
      )}
      {/*<Items price={true} items={items} />*/}
    </main>
  );
};

export default Marketplace;
