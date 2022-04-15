import { useQuery } from '@apollo/client';
import { ITEMS_PER_PAGE } from '../../constants';
import { DocumentNode } from '@apollo/client/core';
import Loader from '../Utils/Loader';
import { IActivityKind } from '../../types/activity';
import Link from 'next/link';

interface IVariable {
  [key: string]: string | number;
}

interface IItems {
  variables?: IVariable;
  query: DocumentNode;
}

const Activity = ({ variables, query }: IItems) => {
  const { data, loading } = useQuery(query, {
    //, fetchMore, refetch
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: ITEMS_PER_PAGE,
      ...variables
    }
  });

  const items = data?.action ?? [];
  console.log('items:::', items);

  return (
    <main>
      {loading && <Loader className={'mt-32'} />}
      <section className={`w-full flex flex-col gap-y-1 text-inactive font-thin`}>
        {items.map((item) => (
          <div key={item.id} className={'flex w-full justify-between'}>
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
                </Link>
              </p>
            )}
            <p className={'text-sm'}>{item.created}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Activity;
