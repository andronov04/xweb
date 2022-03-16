import Head from 'next/head';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../../constants';
import Page from '../../components/Page/Page';
import ConditionRender from '../../components/Utils/ConditionRender';
import Link from 'next/link';

export default function BasePage() {
  return (
    <Page>
      <Head>
        <title>create an asset – art3s</title>
        <meta key="og:title" property="og:title" content={'create an asset – art3s'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={'flex justify-start text-inactive font-thin gap-x-10'}>
        <div>
          <h2 className={'text-active'}>available asset to create</h2>
        </div>
        <div className={'max-w-md w-full'}>
          <Link href={'/create/asset/style'}>
            <a href={'/create/asset/style'}>
              <div className={'cursor-pointer bg-dart2C p-4 rounded-sm hover:opacity-80'}>
                <h2 className={'text-xl'}>style</h2>
                <p>Elements of art direction</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </Page>
  );
}
