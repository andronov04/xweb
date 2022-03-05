import Page from '../components/Page/Page';
import Head from 'next/head';
import GraphqlApi from '../api/GraphqlApi';
import { QL_GET_USER } from '../api/queries';
import { IUser } from '../types';
import UserProfile from '../containers/UserProfile/UserProfile';
import { ipfsToUrl } from '../utils';

const Profile = ({ user }: { user: IUser }) => {
  return (
    <Page>
      <Head>
        <title>@{user?.username ?? user?.id} – xweb</title>
        <meta key="og:title" property="og:title" content={`@${user?.username ?? user?.id} – xweb`} />
        <meta key="description" name="description" content={user.description} />
        <meta key="og:description" property="og:description" content={user.description} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={ipfsToUrl(user.avatar_uri || '')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserProfile user={user} />
    </Page>
  );
};

export default Profile;

export async function getServerSideProps({ params }) {
  const { id: _id } = params;
  const id = _id.slice(1);
  const { data } = await GraphqlApi.query({
    query: QL_GET_USER,
    variables: { username: id }
  });

  return {
    props: {
      user: data.users.find((a) => a.username === id) ?? { id }
    }
  };
}
