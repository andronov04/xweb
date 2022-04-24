import Head from 'next/head';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import Page from '../containers/Page/Page';
import Link from 'next/link';

export default function BasePage() {
  return (
    <Page>
      <Head>
        <title>Create – Contter</title>
        <meta key="og:title" property="og:title" content={'Create – Contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={'flex justify-center'}>
        <div className={'max-w-md w-full text-inactive font-normal'}>
          <Link href={'/create/token'}>
            <a href={'/create/token'}>
              <div className={'cursor-pointer  text-center bg-dart2C p-4 rounded-md hover:opacity-80'}>
                <h2 className={'text-lg'}>Create and mint your own NFT</h2>
              </div>
            </a>
          </Link>
          <div className={'text-lg text-center mt-4'}>
            <Link href={'/upload/asset'}>
              <a href={'/upload/asset'} className={'hover:opacity-80'}>
                Upload asset
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}
