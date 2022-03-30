import { IUser } from '../../types';
import Avatar from '../../components/Avatar/Avatar';
import CustomButton from 'src/components/CustomButton/CustomButton';
import Spacing from '../../components/Spacing/Spacing';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ConditionRender from 'src/components/Utils/ConditionRender';
import UserItems, { IUserItemsVariables } from './UserItems';
import { QL_GET_TOKENS_BY_USER, QL_GET_TOKEN_OWNED_ITEMS_BY_USER, QL_GET_TOKEN_SALES_ITEMS_BY_USER, QL_GET_SCRIPS_BY_USER } from '../../api/queries';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';

const UserProfile = ({ user }: { user: IUser }) => {
  const [stateUser, disconnectUser] = useStore((state) => [state.user, state.disconnectUser], shallow);
  const router = useRouter();
  const isCurrent = user.id === stateUser?.id;
  const url = `/@${user.username ?? user.id}`;
  let query = QL_GET_TOKENS_BY_USER;
  let variables: IUserItemsVariables = { user_id: user.id };
  let price = false;
  if (router.asPath.endsWith('owned')) {
    query = QL_GET_TOKEN_OWNED_ITEMS_BY_USER;
    variables = { owner_id: user.id };
  }
  if (router.asPath.endsWith('sales')) {
    query = QL_GET_TOKEN_SALES_ITEMS_BY_USER;
    variables = { user_id: user.id };
    price = true;
  }
  if (router.asPath.endsWith('styles')) {
    query = QL_GET_SCRIPS_BY_USER;
  }
  if (router.asPath.endsWith('activity')) {
    //
  }

  return (
    <>
      <div className={'flex w-full items-center justify-start gap-x-10'}>
        <div>
          <Avatar avatar_uri={user.avatar_uri ?? ''} />
        </div>
        <div className={'flex-grow flex items-start'}>
          {/*<p className={'text-whitegrey text-sm'}>{user.id}</p>*/}
          {(user.id ?? user.username) && <h2 className={'text-2xl text-active mt-3'}>@{user.username ?? user.id}</h2>}
          {user.description && <p className={'text-inactive'}>{user.description}</p>}
        </div>
        {isCurrent && (
          <div>
            <CustomButton
              styles={{
                color: 'rgba(255,53,53,0.9)'
              }}
              onClick={() => {
                disconnectUser().then(() => {
                  // router.replace('/').then().catch();
                });
              }}
              value={'Log out'}
            />
          </div>
        )}
      </div>

      <Spacing size={5} />

      <nav className={'w-full flex justify-center border-b-2 border-b-white10'}>
        <ol className={'flex gap-x-5'}>
          <li
            className={`hover:text-active ${
              router.pathname === '/[id]' && router.asPath.split('/').length === 2 && 'border-b-4 border-b-inactive text-active'
            } p-2 text-xl text-inactive font-light `}
          >
            <Link href={url}>
              <a href={url}>tokens</a>
            </Link>
          </li>
          <li
            className={`hover:text-active ${
              router.asPath.endsWith('owned') && 'border-b-4 border-b-inactive text-active'
            } p-2 text-xl text-inactive font-light `}
          >
            <Link href={`${url}/owned`}>
              <a href={`${url}/owned`}>owned</a>
            </Link>
          </li>
          <li
            className={`hover:text-active ${
              router.asPath.endsWith('sales') && 'border-b-4 border-b-inactive text-active'
            } p-2 text-xl text-inactive font-light `}
          >
            <Link href={`${url}/sales`}>
              <a href={`${url}/sales`}>on sale</a>
            </Link>
          </li>
          <li
            className={`hover:text-active ${
              router.asPath.endsWith('assets') && 'border-b-4 border-b-inactive text-active'
            } p-2 text-xl text-inactive font-light `}
          >
            <Link href={`${url}/assets`}>
              <a href={`${url}/assets`}>assets</a>
            </Link>
          </li>
          <li
            className={`hover:text-active ${
              router.asPath.endsWith('activity') && 'border-b-4 border-b-inactive text-active'
            } p-2 text-xl text-inactive font-light `}
          >
            <Link href={`${url}/activity`}>
              <a href={`${url}/activity`}>activity</a>
            </Link>
          </li>
        </ol>
      </nav>

      <Spacing size={1.2} />

      <ConditionRender client>
        <UserItems user={user} price={price} variables={variables} query={query} />
      </ConditionRender>
    </>
  );
};

export default UserProfile;
