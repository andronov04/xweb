import { IUser } from '../../types';
import { useRouter } from 'next/router';
import { QL_GET_TOKENS_BY_USER, QL_GET_TOKEN_OWNED_ITEMS_BY_USER, QL_GET_TOKEN_SALES_ITEMS_BY_USER, QL_GET_ASSETS_BY_USER } from '../../api/queries';
import Items from '../../components/Items/Items';

const UserItems = ({ user }: { user: IUser }) => {
  const router = useRouter();
  let query = QL_GET_TOKENS_BY_USER;
  let variables: any = { userId: user.id };
  let kind = 'token';
  let mode: any = 'normal';
  if (router.asPath.endsWith('owned')) {
    query = QL_GET_TOKEN_OWNED_ITEMS_BY_USER;
    variables = { ownerId: user.id };
  }
  if (router.asPath.endsWith('sales')) {
    query = QL_GET_TOKEN_SALES_ITEMS_BY_USER;
    variables = { userId: user.id };
    kind = 'offer';
    mode = 'offer';
  }
  if (router.asPath.endsWith('assets')) {
    query = QL_GET_ASSETS_BY_USER;
    kind = 'asset';
  }

  return (
    <>
      <Items kind={kind} mode={mode} query={query} variables={variables} />
    </>
  );
};

export default UserItems;
