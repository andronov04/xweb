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
import Footnote from '../../components/Library/Footnote/Footnote';
import Loader from '../../components/Utils/Loader';
import { CachePolicies, useFetch } from 'use-http';
import { TZKT_URL, TZP_PROFILE_URL } from '../../constants';
import { useAsync } from 'react-async-hook';
import { QL_TZ_PROFILE_USER } from '../../api/queries/tzprofile';
import { parseTzProfile } from '../../utils/user';
import { parseStringUrl } from '../../utils/string';

const UserProfile = ({ user }: { user: IUser }) => {
  const [profile, setProfile] = useState<any>({});
  const [loadUser, setLoadUser] = useState(true);
  const [editUser, setEditUser] = useState(false);
  const {
    data: data,
    post,
    loading
  } = useFetch(TZP_PROFILE_URL, {
    cachePolicy: CachePolicies.NO_CACHE
  });
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

  useAsync(async () => {
    if (!user.temp) {
      const id = user?.id ?? url.slice(2); // TODO Test id
      await post({
        query: QL_TZ_PROFILE_USER,
        variables: {
          id
        }
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      const profile = parseTzProfile(data?.data?.tzprofiles_by_pk?.valid_claims);
      if (profile) {
        setProfile(profile);
      }
    }
  }, [data]);

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
            <Link href={`${TZKT_URL}${user.id}`}>
              <a href={`${TZKT_URL}${user.id}`} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer text-xs text-white30 hover:opacity-80'}>
                <span className={'md:text-base font-normal text-xs cursor-pointer'}>
                  {user.id.slice(0, 4)}...{user.id.slice(-4)}
                </span>
              </a>
            </Link>
            {(user.id ?? user.username) && (
              <h2 className={'my-1 md:text-2xl gap-x-3 flex items-center w-full text-center text-base font-medium text-active relative'}>
                {(user.role === IUserRole.MODERATOR || user.role === IUserRole.ADMIN) && (
                  <span className={'px-1.5 py-0.5 md:absolute md:mb-0 mb-2 flex w-fit -top-6 rounded-sm font-normal bg-black20 text-inactive text-xs'}>
                    {user.role === IUserRole.MODERATOR ? 'Moderator' : 'Administrator'}
                  </span>
                )}
                <span>@{user.username ?? user.id}</span>
                {user.verified ? (
                  <span>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4.63604 17.364C3.83954 16.5675 4.36783 14.8952 3.96241 13.9154C3.54215 12.8997 2 12.0822 2 11C2 9.91779 3.54216 9.10031 3.96242 8.08459C4.36783 7.10475 3.83954 5.43254 4.63604 4.63604C5.43254 3.83954 7.10476 4.36783 8.0846 3.96241C9.10034 3.54215 9.91784 2 11 2C12.0822 2 12.8997 3.54216 13.9154 3.96242C14.8952 4.36783 16.5675 3.83954 17.364 4.63604C18.1605 5.43254 17.6322 7.10476 18.0376 8.0846C18.4579 9.10034 20 9.91784 20 11C20 12.0822 18.4578 12.8997 18.0376 13.9154C17.6322 14.8952 18.1605 16.5675 17.364 17.364C16.5675 18.1605 14.8952 17.6322 13.9154 18.0376C12.8997 18.4579 12.0822 20 11 20C9.91779 20 9.10031 18.4578 8.08459 18.0376C7.10475 17.6322 5.43254 18.1605 4.63604 17.364Z"
                        stroke="white"
                        strokeOpacity="0.9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.8078 8.92308L9.73082 13.7692L7.19238 11.3462"
                        stroke="white"
                        strokeOpacity="0.9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}

                {profile?.twitter ? (
                  <span className={'block'}>
                    <Link href={profile.twitter}>
                      <a className={'cursor-pointer hover:opacity-80'} href={profile.twitter} target={'_blank'} rel={'noreferrer'}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20.9806 4.32556C21.0401 4.24123 20.9523 4.13234 20.8573 4.16985C20.1818 4.43645 19.4759 4.61633 18.7559 4.70497C19.5576 4.21722 20.1763 3.47475 20.5194 2.59572C20.5543 2.50618 20.4583 2.42621 20.3755 2.47279C19.6303 2.89185 18.8267 3.1936 17.9919 3.36739C17.9569 3.37466 17.9209 3.36255 17.8964 3.33619C17.2699 2.66305 16.4453 2.21487 15.5463 2.05999C14.6285 1.90186 13.685 2.05843 12.864 2.50515C12.0429 2.95187 11.3907 3.66346 11.0096 4.52834C10.6472 5.35067 10.5494 6.26733 10.7281 7.14768C10.742 7.21599 10.6895 7.28048 10.6211 7.27615C8.99692 7.17343 7.40997 6.7335 5.95805 5.98286C4.50983 5.23413 3.22738 4.19253 2.18883 2.92229C2.14273 2.86592 2.05538 2.87321 2.02179 2.93811C1.69863 3.56258 1.52943 4.2586 1.52989 4.96601C1.52858 5.67016 1.69827 6.36372 2.02386 6.98493C2.34945 7.60615 2.82083 8.13574 3.39604 8.52655C2.78603 8.50965 2.18791 8.35608 1.64396 8.07764C1.57386 8.04176 1.48977 8.09285 1.49342 8.17266C1.53584 9.10115 1.87057 10.0333 2.44996 10.7485C3.06653 11.5095 3.92231 12.0303 4.87255 12.2228C4.50676 12.3362 4.12699 12.396 3.74466 12.4003C3.53657 12.3979 3.32889 12.3822 3.12282 12.3535C3.04641 12.3429 2.98402 12.4168 3.01077 12.4905C3.29419 13.271 3.7949 13.952 4.45326 14.4491C5.15712 14.9806 6.00616 15.2754 6.88225 15.2926C5.40287 16.478 3.57638 17.125 1.69395 17.1303C1.50052 17.131 1.30718 17.1246 1.11429 17.1112C1.0056 17.1037 0.955606 17.2511 1.0493 17.3078C2.88343 18.4161 4.97979 19.002 7.11809 18.9993C8.69682 19.016 10.263 18.7122 11.7251 18.1056C13.1873 17.4991 14.5161 16.6019 15.6339 15.4665C16.7517 14.3311 17.6362 12.9802 18.2356 11.4929C18.835 10.0055 19.1374 8.41141 19.125 6.8037V6.30269C19.125 6.26973 19.1403 6.23873 19.1662 6.21886C19.8617 5.68411 20.4733 5.04568 20.9806 4.32556Z"
                            fill="#00ACEE"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </a>
                    </Link>
                  </span>
                ) : null}

                {profile?.website ? (
                  <span className={'block'}>
                    <Link href={profile.website}>
                      <a className={'cursor-pointer hover:opacity-80'} href={profile.website} target={'_blank'} rel={'noreferrer'}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M2.51251 7C1.96023 7 1.51251 7.44772 1.51251 8C1.51251 8.55229 1.96023 9 2.51251 9V7ZM19.4874 9C20.0396 9 20.4874 8.55229 20.4874 8C20.4874 7.44772 20.0396 7 19.4874 7V9ZM2.51284 13C1.96056 13 1.51284 13.4477 1.51284 14C1.51284 14.5523 1.96056 15 2.51284 15V13ZM19.4876 15C20.0399 15 20.4876 14.5523 20.4876 14C20.4876 13.4477 20.0399 13 19.4876 13V15ZM19 11C19 15.4183 15.4183 19 11 19V21C16.5228 21 21 16.5228 21 11H19ZM11 19C6.58172 19 3 15.4183 3 11H1C1 16.5228 5.47715 21 11 21V19ZM3 11C3 6.58172 6.58172 3 11 3V1C5.47715 1 1 5.47715 1 11H3ZM11 3C15.4183 3 19 6.58172 19 11H21C21 5.47715 16.5228 1 11 1V3ZM2.51251 9H19.4874V7H2.51251V9ZM2.51284 15H19.4876V13H2.51284V15ZM13.75 11C13.75 13.3165 13.3461 15.3662 12.7324 16.7995C12.4248 17.518 12.0842 18.0354 11.7569 18.3587C11.4339 18.6778 11.1793 18.7584 11 18.7584V20.7584C11.8563 20.7584 12.5882 20.3489 13.1625 19.7815C13.7325 19.2184 14.2 18.4533 14.571 17.5867C15.3145 15.8501 15.75 13.5206 15.75 11H13.75ZM11 18.7584C10.8208 18.7584 10.5661 18.6778 10.2431 18.3587C9.91587 18.0354 9.57527 17.518 9.26767 16.7995C8.65399 15.3662 8.25004 13.3165 8.25004 11H6.25004C6.25004 13.5206 6.68554 15.8501 7.4291 17.5867C7.80012 18.4533 8.26757 19.2184 8.83759 19.7815C9.41188 20.3489 10.1438 20.7584 11 20.7584V18.7584ZM8.25004 11C8.25004 8.68351 8.65399 6.63376 9.26767 5.20048C9.57527 4.48204 9.91587 3.96459 10.2431 3.64129C10.5661 3.32221 10.8208 3.2416 11 3.2416V1.2416C10.1438 1.2416 9.41188 1.65115 8.83759 2.21847C8.26757 2.78157 7.80012 3.54675 7.4291 4.41328C6.68554 6.14992 6.25004 8.47936 6.25004 11H8.25004ZM11 3.2416C11.1793 3.2416 11.4339 3.32221 11.7569 3.64129C12.0842 3.96459 12.4248 4.48204 12.7324 5.20048C13.3461 6.63376 13.75 8.68351 13.75 11H15.75C15.75 8.47936 15.3145 6.14992 14.571 4.41328C14.2 3.54675 13.7325 2.78157 13.1625 2.21847C12.5882 1.65115 11.8563 1.2416 11 1.2416V3.2416Z"
                            fill="#44BF7B"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </a>
                    </Link>
                  </span>
                ) : null}
              </h2>
            )}
            {user.description && <p className={'text-inactive text-lg'} dangerouslySetInnerHTML={{ __html: parseStringUrl(user.description ?? '') }} />}
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
