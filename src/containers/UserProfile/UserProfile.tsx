import { IUser, IUserFlag } from '../../types';
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
import { useEffect, useState } from 'react';
import UserEdit from './UserEdit';
import { setMsg } from '../../services/snackbar';
import Popup from 'reactjs-popup';
import Footnote from '../../components/Library/Footnote/Footnote';
import Loader from '../../components/Utils/Loader';

const UserProfile = ({ user }: { user: IUser }) => {
  const [loadUser, setLoadUser] = useState(true);
  const [editUser, setEditUser] = useState(false);
  const [stateUser, disconnectUser] = useStore((state) => [state.user, state.disconnectUser], shallow);
  const router = useRouter();
  const isCurrent = user.id === stateUser?.id;
  let url = `/@${user.username ?? user.id}`;

  const isPkh = router.asPath.startsWith('/pkh/');
  const isActivity = router.asPath.endsWith('activity');
  const isOwned = router.asPath.endsWith('owned');
  const isSales = router.asPath.endsWith('sales');
  const isCreated = !isActivity && !isOwned && !isSales;
  if (isPkh) {
    url = `/pkh/${url.slice(2)}`;
  }

  useEffect(() => {
    if (user.temp && loadUser) {
      // check exists pkh
      fetch(`https://api.tzkt.io/v1/accounts/${user.id}`)
        .then(async (response) => {
          const data = await response.json();
          if (data?.type === 'user') {
            setLoadUser(false);
          } else {
            router.replace('/').then();
          }
        })
        .catch((reason) => {
          router.replace('/').then();
        });
    }
  }, []);

  if (user.temp && loadUser) {
    return (
      <div className={'flex justify-center items-center w-full h-full'}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <>
        {user.flag !== IUserFlag.NONE && !user.temp && (
          <Footnote type={user.flag === IUserFlag.REVIEW ? 'info' : user.flag === IUserFlag.LIMIT ? 'warning' : 'error'}>
            {user.flag === IUserFlag.BANNED && <p>Blocked. This user violated our Code of Conduct.</p>}
            {user.flag === IUserFlag.REVIEW && <p>In moderation. This user is undergoing moderation.</p>}
            {user.flag === IUserFlag.LIMIT && <p>Temporarily restricted. This user is temporarily restricted from using this platform.</p>}
          </Footnote>
        )}
        {user.temp ? (
          <Footnote type={'warning'}>
            <p className={'font-light'}>This account has not interacted with Contter contracts yet.</p>
          </Footnote>
        ) : null}
      </>
      {editUser ? (
        <UserEdit
          onCancel={() => {
            setEditUser(false);
          }}
          user={user}
        />
      ) : (
        <div className={'flex md:flex-row flex-col w-full items-center justify-start gap-x-10'}>
          <div>
            <Avatar avatarUri={user.avatarUri ?? ''} />
          </div>
          <div className={'flex-grow md:mt-0 mt-5 flex flex-col items-start'}>
            {/*<p className={'text-whitegrey text-sm'}>{user.id}</p>*/}
            {(user.id ?? user.username) && (
              <h2 className={'md:text-2xl text-base font-medium text-active'}>
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
                      <span className={'md:text-base font-normal text-xs cursor-pointer'}>
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
            {user.description && <p className={'text-inactive text-lg'}>{user.description}</p>}
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
          { url: url, active: isCreated, displayName: 'Created', pathname: `${isPkh ? '/pkh/' : ''}[id]` },
          { url: `${url}/owned`, active: isOwned, displayName: 'Owned', pathname: `${isPkh ? '/pkh/' : ''}[id]/owned` },
          { url: `${url}/sales`, active: isSales, displayName: 'On sale', pathname: `${isPkh ? '/pkh/' : ''}[id]/sales` },
          { url: `${url}/activity`, active: isActivity, displayName: 'Activity', pathname: `${isPkh ? '/pkh/' : ''}[id]/activity` }
        ]}
      />

      <Spacing size={1.2} />

      <ConditionRender client>
        <div>{isActivity ? <Activity query={QL_GET_ACTION_BY_USER} variables={{ userId: user.id }} /> : <UserItems user={user} />}</div>
      </ConditionRender>
    </>
  );
};

export default UserProfile;
