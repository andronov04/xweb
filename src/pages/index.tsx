import Head from 'next/head';
import Page from '../containers/Page/Page';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import ConditionRender from '../components/Utils/ConditionRender';
import RandomItem from '../containers/RandomItem/RandomItem';
import FAQ from '../components/FAQ/FAQ';
import Spacing from '../components/Spacing/Spacing';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Contter</title>
        <meta key="og:title" property="og:title" content={'Contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*<main>*/}
      {/*  <section style={{ height: '50vh' }} className={'flex-col flex md:flex-row gap-x-10 justify-between items-center'}>*/}
      {/*    <div className={'md:w-1/2 w-full'}>*/}
      {/*      <div className={'text-3xl md:text-left text-center font-medium'}>Endless creative possibilities</div>*/}
      {/*    </div>*/}
      {/*    <div className={'md:w-1/2 w-full h-full'}>*/}
      {/*      <ConditionRender client>*/}
      {/*        <RandomItem />*/}
      {/*      </ConditionRender>*/}
      {/*    </div>*/}
      {/*  </section>*/}

      {/*  <Spacing size={4} />*/}

      {/*  <div className={'mt-20'}>*/}
      {/*    <FAQ />*/}
      {/*  </div>*/}
      {/*</main>*/}
    </div>
  );
}
