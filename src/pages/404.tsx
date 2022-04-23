import Head from 'next/head';
import Link from 'next/link';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';

export default function BasePage() {
  return (
    <div className={'w-full h-full'}>
      <Head>
        <title>404 – Contter</title>
        <meta key="og:title" property="og:title" content={'404 – Contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={'w-full h-full flex flex-col justify-center items-center'}>
        <h2 className={'text-4xl text-active'}>404 // This page could not be found</h2>
        <p className={'text-xl'}>
          <Link href={'/'}>
            <a className={'text-inactive cursor-pointer hover:opacity-80'} href={'/'}>
              Back to home
            </a>
          </Link>
        </p>
      </main>
    </div>
  );
}
