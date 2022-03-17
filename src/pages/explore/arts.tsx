import Head from 'next/head';
import Page from '../../containers/Page/Page';
import Explore from '../../containers/Explore/Explore';
import ConditionRender from '../../components/Utils/ConditionRender';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../../constants';

export default function ExploreArtsPage() {
  return (
    <Page>
      <Head>
        <title>Explore Arts – xweb</title>
        <meta key="og:title" property="og:title" content={'Explore Arts – xweb'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <h2 className={'text-3xl text-center text-active'}>Explore</h2>
      </section>

      <ConditionRender client>
        <Explore />
      </ConditionRender>
    </Page>
  );
}
