import Head from 'next/head';
import Page from '../containers/Page/Page';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import ConditionRender from '../components/Utils/ConditionRender';
import RandomItem from '../containers/RandomItem/RandomItem';
import FAQ from '../components/FAQ/FAQ';
import Spacing from '../components/Spacing/Spacing';

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Contter - First AI social network</title>
        <meta key="og:title" property="og:title" content={'Contter'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>First AI social network. Coming soon</main>
    </Page>
  );
}
