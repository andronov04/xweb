import { useQuery } from '@apollo/client';
import { ITEMS_PER_PAGE } from '../../constants';
import { QL_GET_SCRIPTS } from '../../api/queries';
import Loader from '../../components/Utils/Loader';
import { IItem } from '../../types';
import { useMemo } from 'react';
import Items from '../Items/Items';

const Create = () => {
  const { data, loading, fetchMore, refetch } = useQuery(QL_GET_SCRIPTS, {
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
          <div className={'text-inactive'}>choose a style to create your own art</div>
          <div>
            <p className={'hover:text-active cursor-pointer text-whitegrey'}>create a style</p>
          </div>
        </div>
      )}
      <Items items={items} />
    </main>
  );
};

export default Create;
