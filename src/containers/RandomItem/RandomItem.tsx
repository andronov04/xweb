import { useMemo, useRef } from 'react';
import Loader from '../../components/Utils/Loader';
import { QL_GET_COUNT_TOKENS, QL_GET_TOKEN_BY_ID } from '../../api/queries';
import { useQuery } from '@apollo/client';
import { RN } from '../../utils';
import Item from '../../components/Item/Item';

const RandomItem = () => {
  const refContainer = useRef<HTMLDivElement | null>(null);
  // TODO Filter is active not reviewed and banned
  const { data: dt, loading: ld } = useQuery(QL_GET_COUNT_TOKENS, {
    fetchPolicy: 'no-cache'
  });
  const count = useMemo(() => dt?.tokenAggregate?.aggregate?.count, [dt]);
  const id = useMemo(() => Math.floor(RN(1, count - 1)), [count]);
  // TODO Many renderes

  const { data, loading } = useQuery(QL_GET_TOKEN_BY_ID, {
    // notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    skip: id === undefined,
    variables: {
      id: id
    }
  });
  return (
    <div ref={refContainer} className={'w-full h-full mt-5 md:mt-0  flex md:justify-end justify-center items-center'}>
      {loading && <Loader />}
      {!loading && data?.token?.length ? (
        <div
          style={{
            width: Math.min(refContainer.current?.offsetWidth ?? 500, refContainer.current?.offsetHeight ?? 500),
            height: Math.min(refContainer.current?.offsetWidth ?? 500, refContainer.current?.offsetHeight ?? 500)
          }}
        >
          <Item key={`${data.token[0].id}_${data.token[0].slug}`} item={data.token[0]} mode={data.token[0].offer ? 'offer' : 'normal'} />
        </div>
      ) : null}
    </div>
  );
};

export default RandomItem;
