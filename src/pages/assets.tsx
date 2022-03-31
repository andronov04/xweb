import Head from 'next/head';
import ConditionRender from '../components/Utils/ConditionRender';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import Page from '../containers/Page/Page';
import Items from '../components/Items/Items';
import { QL_GET_ASSET_ITEMS } from '../api/queries';

export default function AssetsPage() {
  return (
    <Page>
      <Head>
        <title>Assets – Contter</title>
        <meta key="og:title" property="og:title" content={'Assets – Contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <main>
          <Items kind={'asset'} query={QL_GET_ASSET_ITEMS} />
        </main>
      </ConditionRender>
    </Page>
  );
}