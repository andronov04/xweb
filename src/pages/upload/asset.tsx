import Head from 'next/head';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../../constants';
import Page from '../../containers/Page/Page';
import ConditionRender from '../../components/Utils/ConditionRender';
import CreateAsset from '../../containers/CreateAsset/CreateAsset';

export default function BasePage() {
  return (
    <Page>
      <Head>
        <title>Upload asset – Contter</title>
        <meta key="og:title" property="og:title" content={'Upload asset – Contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <CreateAsset />
      </ConditionRender>
    </Page>
  );
}