import Head from 'next/head';
import ConditionRender from '../../../components/Utils/ConditionRender';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../../../constants';
import PreviewAsset from '../../../containers/CreateAsset/PreviewAsset/PreviewAsset';

export default function BasePage() {
  return (
    <div className={'w-full h-full'}>
      <Head>
        <title>Asset preview – Contter</title>
        <meta key="og:title" property="og:title" content={'Asset preview – Contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <PreviewAsset />
      </ConditionRender>
    </div>
  );
}
