import Head from 'next/head';
import Page from '../../../components/Page/Page';
import ConditionRender from '../../../components/Utils/ConditionRender';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../../../constants';
import CreateStyle from '../../../containers/CreateStyle/CreateStyle';

export default function CreateAssetStylePage() {
  return (
    <Page>
      <Head>
        <title>create an asset – art3s</title>
        <meta key="og:title" property="og:title" content={'create an asset – art3s'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <CreateStyle />
      </ConditionRender>
    </Page>
  );
}
