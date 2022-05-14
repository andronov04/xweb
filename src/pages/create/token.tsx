import Head from 'next/head';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../../constants';
import ConditionRender from '../../components/Utils/ConditionRender';
import CreateToken from '../../containers/CreateToken/CreateToken';

export default function CreateTokenPage() {
  return (
    <div className={'w-full h-full'}>
      <Head>
        <title>Create a token – Contter</title>
        <meta key="og:title" property="og:title" content={'Create a token – Contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionRender client>
        <CreateToken />
      </ConditionRender>
    </div>
  );
}
