import Head from 'next/head';
import Page from '../../../../components/Page/Page';
import ConditionRender from '../../../../components/Utils/ConditionRender';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../../../../constants';
import PreviewStyle from '../../../../containers/CreateStyle/PreviewStyle/PreviewStyle';

export default function BasePage() {
  return (
    <Page>
      <Head>
        <title>create a style – art3s</title>
        <meta key="og:title" property="og:title" content={'create a style – art3s'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <PreviewStyle />
      </ConditionRender>
    </Page>
  );
}