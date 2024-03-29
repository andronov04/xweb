import { IUser } from '../../types';
import { useRouter } from 'next/router';
import { QL_GET_TOKEN_OWNED_ITEMS_BY_USER, QL_GET_TOKEN_SALES_ITEMS_BY_USER, QL_GET_CREATED_BY_USER, QL_GET_CREATED_WITH_BY_USER } from '../../api/queries';
import Items from '../../components/Items/Items';

const UserItems = ({ user, isCurrent }: { user: IUser; isCurrent: boolean }) => {
  const router = useRouter();
  let query = QL_GET_CREATED_BY_USER;
  let variables: any = { userId: user.id };
  if (!isCurrent) {
    query = QL_GET_CREATED_WITH_BY_USER;
    variables = { userId: user.id, enabled: true };
  } // TODO all check disabled and enabled
  let kind: string | string[] = ['token', 'asset'];
  let mode: any = 'all';
  if (router.asPath.endsWith('owned')) {
    query = QL_GET_TOKEN_OWNED_ITEMS_BY_USER;
    variables = { ownerId: user.id };
    mode = 'normal';
  }
  if (router.asPath.endsWith('sales')) {
    query = QL_GET_TOKEN_SALES_ITEMS_BY_USER;
    variables = { userId: user.id };
    kind = 'offer';
    mode = 'offer';
  }

  return (
    <>
      <Items key={mode} kind={kind} mode={mode} query={query} variables={variables} />
    </>
  );
};

export default UserItems;
