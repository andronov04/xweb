import Head from 'next/head';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import Page from '../components/Page/Page';
import ConditionRender from '../components/Utils/ConditionRender';
import Link from 'next/link';

export default function BasePage() {
  return (
    <Page>
      <Head>
        <title>create – art3s</title>
        <meta key="og:title" property="og:title" content={'create – art3s'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={'flex justify-center'}>
        <div className={'max-w-md w-full text-inactive font-thin'}>
          <Link href={'/create/art'}>
            <a href={'/create/art'}>
              <div className={'cursor-pointer bg-dart2C p-4 rounded-sm hover:opacity-80'}>
                <h2 className={'text-xl'}>create your own art</h2>
                <p>Using assets and an editor, create unique and non-repeating art</p>
              </div>
            </a>
          </Link>
          <div className={'text-right mt-4'}>
            <Link href={'/create/asset'}>
              <a href={'/create/asset'} className={'hover:opacity-80'}>
                create an asset
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}
