import Head from 'next/head';
import Page from '../containers/Page/Page';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';

export default function Home() {
  return (
    <Page>
      <Head>
        <title>art3s: art for everyone</title>
        <meta key="og:title" property="og:title" content={'art3s: art for everyone'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </Page>
  );
}
