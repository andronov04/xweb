import Head from 'next/head';
import Explore from '../containers/Explore/Explore';
import ConditionRender from '../components/Utils/ConditionRender';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import Page from '../containers/Page/Page';

export default function ExplorePage() {
  return (
    <Page>
      <Head>
        <title>Explore – xweb</title>
        <meta key="og:title" property="og:title" content={'Explore – xweb'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <Explore />
      </ConditionRender>
    </Page>
  );
}
