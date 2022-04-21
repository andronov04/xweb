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
import Navs from '../../components/Navs/Navs';

const UserProfile = ({ user }: { user: IUser }) => {
  const [stateUser, disconnectUser] = useStore((state) => [state.user, state.disconnectUser], shallow);
  const router = useRouter();
  const isCurrent = user.id === stateUser?.id;
  const url = `/@${user.username ?? user.id}`;

  const isActivity = router.asPath.endsWith('activity');
  const isOwned = router.asPath.endsWith('owned');
  const isSales = router.asPath.endsWith('sales');

  return (
    <>
      <div className={'flex w-full items-center justify-start gap-x-10'}>
        <div>
          <Avatar avatarUri={user.avatarUri ?? ''} />
        </div>
        <div className={'flex-grow flex items-start'}>
          {/*<p className={'text-whitegrey text-sm'}>{user.id}</p>*/}
          {(user.id ?? user.username) && <h2 className={'text-2xl text-active'}>@{user.username ?? user.id}</h2>}
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

      <Navs
        links={[
          { url: url, active: isCurrent, displayName: 'Created', pathname: '/token/[id]/assets' },
          { url: `${url}/owned`, active: isOwned, displayName: 'Owned', pathname: '/[id]/owned' },
          { url: `${url}/sales`, active: isSales, displayName: 'On sale', pathname: '/[id]/sales' },
          { url: `${url}/activity`, active: isActivity, displayName: 'Activity', pathname: '/[id]/activity' }
        ]}
      />

      <Spacing size={1.2} />

      <ConditionRender client>
        {isActivity ? <Activity query={QL_GET_ACTION_BY_USER} variables={{ userId: user.id }} /> : <UserItems user={user} />}
      </ConditionRender>
    </>
  );
};

export default UserProfile;
