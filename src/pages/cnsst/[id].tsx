import Head from 'next/head';
import { IAsset } from '../../types';
import GraphqlApi from '../../api/GraphqlApi';
import { QL_GET_ASSET_BY_ID } from '../../api/queries';
import { ipfsToUrl } from '../../utils';
import Page from '../../containers/Page/Page';
import AssetItem from '../../containers/AssetItem/AssetItem';

const MainPage = ({ item }: { item: IAsset }) => {
  return (
    <Page>
      <Head>
        <title>{item.name} – Contter</title>
        <meta key="og:title" property="og:title" content={`${item.name} – Contter`} />
        <meta key="description" name="description" content={item.description} />
        <meta key="og:description" property="og:description" content={item.description} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={ipfsToUrl(item.metadata?.displayUri ?? '')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AssetItem item={item} />
    </Page>
  );
};

export default MainPage;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const { data } = await GraphqlApi.query({
    query: QL_GET_ASSET_BY_ID,
    fetchPolicy: 'no-cache',
    variables: { id }
  });
  const item = { ...data.asset.find((a) => a.id === parseInt(id)) };
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
