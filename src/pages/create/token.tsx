import Head from 'next/head';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../../constants';
import Page from '../../containers/Page/Page';
import ConditionRender from '../../components/Utils/ConditionRender';
import CreateToken from '../../containers/CreateToken/CreateToken';

export default function CreateTokenPage() {
  return (
    <Page>
      <Head>
        <title>create token – contter</title>
        <meta key="og:title" property="og:title" content={'create token – contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <CreateToken />
      </ConditionRender>
    </Page>
  );
}
