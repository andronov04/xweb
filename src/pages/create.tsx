import Head from 'next/head';
import Page from '../components/Page/Page';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import ConditionRender from '../components/Utils/ConditionRender';
import Create from 'src/containers/Create/Create';

export default function CreatePage() {
  return (
    <Page>
      <Head>
        <title>Create – xweb</title>
        <meta key="og:title" property="og:title" content={'Create – xweb'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <Create />
      </ConditionRender>
    </Page>
  );
}
