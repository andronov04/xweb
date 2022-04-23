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
import { useState } from 'react';
import UserEdit from './UserEdit';
import { setMsg } from '../../services/snackbar';
import Popup from 'reactjs-popup';

const UserProfile = ({ user }: { user: IUser }) => {
  const [editUser, setEditUser] = useState(false);
  const [stateUser, disconnectUser] = useStore((state) => [state.user, state.disconnectUser], shallow);
  const router = useRouter();
  const isCurrent = user.id === stateUser?.id;
  const url = `/@${user.username ?? user.id}`;

  const isActivity = router.asPath.endsWith('activity');
  const isOwned = router.asPath.endsWith('owned');
  const isSales = router.asPath.endsWith('sales');
  const isCreated = !isActivity && !isOwned && !isSales;

  return (
    <>
      {editUser ? (
        <UserEdit
          onCancel={() => {
            setEditUser(false);
          }}
          user={user}
        />
      ) : (
        <div className={'flex w-full items-center justify-start gap-x-10'}>
          <div>
            <Avatar avatarUri={user.avatarUri ?? ''} />
          </div>
          <div className={'flex-grow flex flex-col items-start'}>
            {/*<p className={'text-whitegrey text-sm'}>{user.id}</p>*/}
            {(user.id ?? user.username) && (
              <h2 className={'text-2xl text-active'}>
                @{user.username ?? user.id}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(user.id).then(
                      () => {
                        setMsg({ autoClose: 1000, title: 'TZ address copied to clipboard', kind: 'info' });
                      },
                      (err) => {
                        setMsg({ autoClose: 1000, title: 'Error to copy TZ address to clipboard', kind: 'error' });
                      }
                    );
                  }}
                  className={'cursor-pointer text-xs text-white30 ml-1.5 hover:opacity-80'}
                >
                  <Popup
                    trigger={() => (
                      <span className={'cursor-pointer'}>
                        {user.id.slice(0, 4)}...{user.id.slice(-4)}
                      </span>
                    )}
                    on={['hover', 'focus']}
                    position={'bottom center'}
                    closeOnDocumentClick
                  >
                    <p className={'bg-black20 rounded-md px-4 py-1.5 text-whitegrey '}>Copy TZ address</p>
                  </Popup>
                </span>
              </h2>
            )}
            {user.description && <p className={'text-inactive'}>{user.description}</p>}
          </div>
          {isCurrent && (
            <div className={'flex flex-col gap-y-2'}>
              <CustomButton
                value={'Edit Profile'}
                onClick={() => {
                  setEditUser(true);
                }}
              />
              <CustomButton
                styles={{
                  color: 'rgba(255,53,53,0.9)',
                  background: 'transparent'
                }}
                onClick={() => {
                  disconnectUser().then(() => {
                    router.reload();
                    // router.replace('/').then().catch();
                  });
                }}
                value={'Log out'}
              />
            </div>
          )}
        </div>
      )}

      <Spacing size={5} />

      <Navs
        links={[
          { url: url, active: isCreated, displayName: 'Created', pathname: '[id]' },
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
