import Head from 'next/head';
import { IToken } from '../../types';
import GraphqlApi from '../../api/GraphqlApi';
import { QL_GET_TOKEN_BY_ID } from '../../api/queries';
import TokenItem from '../../containers/TokenItem/TokenItem';
import { ipfsToUrl } from '../../utils';
import Page from '../../containers/Page/Page';

const ArtPage = ({ item }: { item: IToken }) => {
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

      <TokenItem item={item} />
    </Page>
  );
};

export default ArtPage;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const { data } = await GraphqlApi.query({
    query: QL_GET_TOKEN_BY_ID,
    fetchPolicy: 'no-cache',
    variables: { id }
  });
  const item = data.token.find((a) => a.id === parseInt(id));
  if (item === undefined) {
    return {
      notFound: true
    };
  }
  console.log(item);

  return {
    props: {
      item
    }
  };
}
