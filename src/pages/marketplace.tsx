import Head from 'next/head';
import Page from '../containers/Page/Page';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import ConditionRender from '../components/Utils/ConditionRender';
import Marketplace from 'src/containers/Marketplace/Marketplace';

export default function MarketplacePage() {
  return (
    <Page>
      <Head>
        <title>Marketplace – xweb</title>
        <meta key="og:title" property="og:title" content={'Marketplace – xweb'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <Marketplace />
      </ConditionRender>
    </Page>
  );
}
