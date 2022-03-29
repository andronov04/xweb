import Head from 'next/head';
import { IArt } from '../../types';
import GraphqlApi from '../../api/GraphqlApi';
import { QL_GET_TOKEN } from '../../api/queries';
import ArtItem from '../../containers/ArtItem/ArtItem';
import { ipfsToUrl } from '../../utils';
import Page from '../../containers/Page/Page';

const ArtPage = ({ item }: { item: IArt }) => {
  return (
    <Page>
      <Head>
        <title>{item.name} – xweb</title>
        <meta key="og:title" property="og:title" content={`${item.name} – xweb`} />
        <meta key="description" name="description" content={item.description} />
        <meta key="og:description" property="og:description" content={item.description} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={ipfsToUrl(item.metadata?.displayUri)} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ArtItem item={item} />
    </Page>
  );
};

export default ArtPage;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const { data } = await GraphqlApi.query({
    query: QL_GET_TOKEN,
    variables: { slug: id }
  });
  // TODO find by slug and id
  const item = data.tokens.find((a) => a.slug === id);
  if (item === undefined) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      item
    }
  };
}
