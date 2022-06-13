import Head from 'next/head';
import { CNTTR_CMD_MINT, DESCRIPTION_SEO, IFRAME_ALLOW, IFRAME_SANDBOX, IMAGE_SEO, URL } from '../constants';
import ConditionRender from '../components/Utils/ConditionRender';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IframePage = () => {
  const router = useRouter();

  useEffect(() => {
    const listener = (ev) => {
      if (ev.data.type === CNTTR_CMD_MINT) {
        router.replace('/create/mint').then().catch();
      }
    };
    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  });

  return (
    <iframe
      src={`/editor${document?.location?.search ?? ''}`}
      width={'100%'}
      height={'100%'}
      frameBorder="0"
      onLoad={() => {
        if (router.query?.a) {
          setTimeout(() => {
            window.history.replaceState({}, '', `${URL()}/create`);
          }, 5000);
        }
      }}
      className={'iframe overflow-hidden'}
      sandbox={IFRAME_SANDBOX}
      allow={IFRAME_ALLOW}
    />
  );
};

export default function BasePage() {
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
        <IframePage />
      </ConditionRender>
    </div>
  );
}
