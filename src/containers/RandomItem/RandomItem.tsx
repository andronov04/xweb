import { useMemo, useRef } from 'react';
import Loader from '../../components/Utils/Loader';
import { QL_GET_COUNT_TOKENS, QL_GET_TOKEN_RANDOM_BY_ID } from '../../api/queries';
import { useQuery } from '@apollo/client';
import { RN } from '../../utils';
import Item from '../../components/Item/Item';
import { ITEMS_PER_PAGE } from '../../constants';

const RandomWrapperItem = ({ width, height, offset }: { width: number; height: number; offset: number }) => {
  const { data, loading } = useQuery(QL_GET_TOKEN_RANDOM_BY_ID, {
    // notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    // skip: count === undefined,
    variables: {
      offset: offset,
      limit: ITEMS_PER_PAGE
    }
  });
  const length = data?.token?.length ?? 0;
  const index = Math.floor(RN(0, length - 1));

  return (
    <div
      style={{
        width: Math.min(width ?? 500, height ?? 500),
        height: Math.min(width ?? 500, height ?? 500)
      }}
    >
      {loading && <Loader />}
      {data && data?.token?.[index] ? (
        <Item
          hidePrice={true}
          key={`${data.token[index].id}_${data.token[index].slug}`}
          item={data.token[index]}
          mode={data.token[index].offer ? 'offer' : 'normal'}
        />
      ) : null}
    </div>
  );
};

const RandomItem = () => {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const { data: dt, loading: ld } = useQuery(QL_GET_COUNT_TOKENS, {
    fetchPolicy: 'no-cache'
  });
  const count = useMemo(() => dt?.tokenAggregate?.aggregate?.count, [dt]);
  const offset = Math.floor(RN(0, count / 2));

  return (
    <div ref={refContainer} className={'relative w-full h-full mt-5 md:mt-0  flex md:justify-end justify-center items-center'}>
      <div className={'w-full h-full absolute'}>{ld && <Loader />}</div>
      {offset !== undefined && !isNaN(offset) ? (
        <RandomWrapperItem
          offset={offset}
          width={Math.min(refContainer.current?.offsetWidth ?? 500, refContainer.current?.offsetHeight ?? 500)}
          height={Math.min(refContainer.current?.offsetWidth ?? 500, refContainer.current?.offsetHeight ?? 500)}
        />
      ) : null}
    </div>
  );
};

export default RandomItem;
