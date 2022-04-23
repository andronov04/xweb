import Head from 'next/head';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import Page from '../containers/Page/Page';

export default function BasePage() {
  return (
    <Page>
      <Head>
        <title>Code of Conduct – Contter</title>
        <meta key="og:title" property="og:title" content={'Code of Conduct – Contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Code of Conduct</h1>
      </main>
    </Page>
  );
}
