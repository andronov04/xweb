import { IUser, IUserFlag, IUserRole } from '../../types';
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
        <div className={'flex flex-col gap-y-1 w-full mb-4'}>
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
        </div>
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
              <h2 className={'md:text-2xl text-center text-base font-medium text-active relative'}>
                {(user.role === IUserRole.MODERATOR || user.role === IUserRole.ADMIN) && (
                  <span className={'px-1.5 py-0.5 md:absolute md:mb-0 mb-2 flex w-fit -top-6 rounded-sm font-normal bg-black20 text-inactive text-xs'}>
                    {user.role === IUserRole.MODERATOR ? 'Moderator' : 'Administrator'}
                  </span>
                )}
                @{user.username ?? user.id}
                {user.verified ? (
                  <span>
                    <svg className={'inline -mt-1'} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.636 28.364C14.8395 27.5675 15.3678 25.8952 14.9624 24.9154C14.5421 23.8997 13 23.0822 13 22C13 20.9178 14.5422 20.1003 14.9624 19.0846C15.3678 18.1048 14.8395 16.4325 15.636 15.636C16.4325 14.8395 18.1048 15.3678 19.0846 14.9624C20.1003 14.5421 20.9178 13 22 13C23.0822 13 23.8997 14.5422 24.9154 14.9624C25.8952 15.3678 27.5675 14.8395 28.364 15.636C29.1605 16.4325 28.6322 18.1048 29.0376 19.0846C29.4579 20.1003 31 20.9178 31 22C31 23.0822 29.4578 23.8997 29.0376 24.9154C28.6322 25.8952 29.1605 27.5675 28.364 28.364C27.5675 29.1605 25.8952 28.6322 24.9154 29.0376C23.8997 29.4579 23.0822 31 22 31C20.9178 31 20.1003 29.4578 19.0846 29.0376C18.1048 28.6322 16.4325 29.1605 15.636 28.364Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path d="M25.8078 19.9231L20.7308 24.7692L18.1924 22.3462" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : null}
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
                  className={`cursor-pointer text-xs text-white30 ${user.verified ? '' : 'ml-1.5'} hover:opacity-80`}
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
        <div>
          {isActivity ? (
            <Activity query={QL_GET_ACTION_BY_USER} variables={{ userId: user.id }} />
          ) : (
            <UserItems key={isCurrent ? 'yes' : 'no'} isCurrent={isCurrent} user={user} />
          )}
        </div>
      </ConditionRender>
    </>
  );
};

export default UserProfile;
