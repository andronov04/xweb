import { IUser } from '../../types';
import Avatar from '../../components/Avatar/Avatar';
import CustomButton from 'src/components/CustomButton/CustomButton';
import Spacing from '../../components/Spacing/Spacing';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ConditionRender from 'src/components/Utils/ConditionRender';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';
import UserItems from './UserItems';
import Activity from '../../components/Activity/Activity';
import { QL_GET_ACTION_BY_USER } from '../../api/queries';

const UserProfile = ({ user }: { user: IUser }) => {
  const [stateUser, disconnectUser] = useStore((state) => [state.user, state.disconnectUser], shallow);
  const router = useRouter();
  const isCurrent = user.id === stateUser?.id;
  const url = `/@${user.username ?? user.id}`;

  const isActivity = router.asPath.endsWith('activity');

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

      <nav className={'w-full flex justify-start border-b-2 border-b-white10'}>
        <ol className={'flex gap-x-5'}>
          <li
            className={`hover:text-active ${
              router.pathname === '/[id]' && router.asPath.split('/').length === 2 && 'border-b-4 border-b-inactive text-active'
            } p-2 text-xl text-inactive font-light `}
          >
            <Link href={url}>
              <a href={url}>Created</a>
            </Link>
          </li>
          <li
            className={`hover:text-active ${
              router.asPath.endsWith('owned') && 'border-b-4 border-b-inactive text-active'
            } p-2 text-xl text-inactive font-light `}
          >
            <Link href={`${url}/owned`}>
              <a href={`${url}/owned`}>Owned</a>
            </Link>
          </li>
          <li
            className={`hover:text-active ${
              router.asPath.endsWith('sales') && 'border-b-4 border-b-inactive text-active'
            } p-2 text-xl text-inactive font-light `}
          >
            <Link href={`${url}/sales`}>
              <a href={`${url}/sales`}>On sale</a>
            </Link>
          </li>
          {/*<li*/}
          {/*  className={`hover:text-active ${*/}
          {/*    router.asPath.endsWith('assets') && 'border-b-4 border-b-inactive text-active'*/}
          {/*  } p-2 text-xl text-inactive font-light `}*/}
          {/*>*/}
          {/*  <Link href={`${url}/assets`}>*/}
          {/*    <a href={`${url}/assets`}>Assets</a>*/}
          {/*  </Link>*/}
          {/*</li>*/}
          <li
            className={`hover:text-active ${
              router.asPath.endsWith('activity') && 'border-b-4 border-b-inactive text-active'
            } p-2 text-xl text-inactive font-light `}
          >
            <Link href={`${url}/activity`}>
              <a href={`${url}/activity`}>Activity</a>
            </Link>
          </li>
        </ol>
      </nav>

      <Spacing size={1.2} />

      <ConditionRender client>
        {isActivity ? <Activity query={QL_GET_ACTION_BY_USER} variables={{ userId: user.id }} /> : <UserItems user={user} />}
      </ConditionRender>
    </>
  );
};

export default UserProfile;
