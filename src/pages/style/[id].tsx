import Head from 'next/head';
import Page from 'src/components/Page/Page';
import { IAsset } from '../../types';
import GraphqlApi from '../../api/GraphqlApi';
import { QL_GET_SCRIPT } from '../../api/queries';
import { ipfsToUrl } from '../../utils';
import ScriptItem from '../../containers/ScriptItem/ScriptItem';

const ArtPage = ({ item }: { item: IAsset }) => {
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

      <ScriptItem item={item} />
    </Page>
  );
};

export default ArtPage;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const { data } = await GraphqlApi.query({
    query: QL_GET_SCRIPT,
    variables: { slug: id }
  });
  // TODO find by slug and id
  const item = { ...data.scripts.find((a) => a.slug === id) };
  if (item === undefined) {
    return {
      notFound: true
    };
  }
  // count_tokens
  item.count_tokens = item.tokens_aggregate?.aggregate?.count ?? 0;

  return {
    props: {
      item
    }
  };
}
