import Page from '../../containers/Page/Page';
import Head from 'next/head';
import GraphqlApi from '../../api/GraphqlApi';
import { IUser } from '../../types';
import UserProfile from '../../containers/UserProfile/UserProfile';
import { ipfsToUrl } from '../../utils';
import { QL_GET_USER_BY_ID } from '../../api/queries';

const Profile = ({ user }: { user: IUser }) => {
  return (
    <Page>
      <Head>
        <title>{user?.id} – Contter</title>
        <meta key="og:title" property="og:title" content={`${user?.id} – Contter`} />
        <meta key="description" name="description" content={user.description} />
        <meta key="og:description" property="og:description" content={user.description} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={ipfsToUrl(user.avatarUri || '')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserProfile user={user} />
    </Page>
  );
};

export default Profile;

export async function getServerSideProps({ params }) {
  const { id: _id } = params;
  const id = _id;
  let data: { user: IUser[] } = { user: [] };
  try {
    const { data: _data } = await GraphqlApi.query({
      query: QL_GET_USER_BY_ID,
      variables: { id },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache'
    });
    data = _data;
  } catch (e) {
    return {
      props: {},
      notFound: true,
      redirect: {
        destination: '/',
        permanent: 410
      }
    };
  }
  let user = data?.user?.find((a) => a.id === id);
  if (!user) {
    user = {
      id,
      temp: true
    };
  }

  return {
    props: {
      user: user
    }
  };
}
