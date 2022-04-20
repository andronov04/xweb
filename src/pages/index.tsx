import Head from 'next/head';
import Page from '../containers/Page/Page';
import { DESCRIPTION_SEO, IMAGE_SEO } from '../constants';
import ConditionRender from '../components/Utils/ConditionRender';
import RandomItem from '../containers/RandomItem/RandomItem';
import FAQ from '../components/FAQ/FAQ';

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Contter</title>
        <meta key="og:title" property="og:title" content={'Contter'} />
        <meta key="description" name="description" content={DESCRIPTION_SEO} />
        <meta key="og:description" property="og:description" content={DESCRIPTION_SEO} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={IMAGE_SEO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section style={{ height: '50vh' }} className={'flex-col flex md:flex-row gap-x-10 justify-between items-center'}>
          <div className={'w-1/2'}>
            <div className={'text-3xl'}>
              <p>
                A place where <span style={{ color: '#1EA2ED' }}>everyone</span> can
              </p>
              <p>
                create <span style={{ color: '#E8D315' }}>art</span>, <span style={{ color: '#FF47CC' }}>design</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>, and more</span>
              </p>
            </div>
            <div className={'text-inactive mt-10 font-thin'}>
              <p>The web3 design platform and NFT marketplace</p>
              <p>on the Tezos blockchain</p>
            </div>
          </div>
          <div className={'w-1/2 h-full'}>
            <ConditionRender client>
              <RandomItem />
            </ConditionRender>
          </div>
        </section>

        <div className={'mt-20 h-0.5 bg-whitegrey w-full rounded-sm'} />

        <div className={'mt-20'}>
          <FAQ />
        </div>

        <div className={'mt-20 gap-x-2 flex justify-center items-center'}>
          <svg style={{ marginTop: '-4px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6 4H7V3H6C4.89543 3 4 3.89543 4 5V11C4 12.1046 4.89543 13 6 13H7V12H6C5.44772 12 5 11.5523 5 11V5C5 4.44772 5.44772 4 6 4ZM10 12C9.44771 12 9 11.5523 9 11C9 10.4477 9.44771 10 10 10C10.5523 10 11 10.4477 11 11C11 11.5523 10.5523 12 10 12ZM12 11C12 12.1046 11.1046 13 10 13C8.89543 13 8 12.1046 8 11C8 9.89543 8.89543 9 10 9C11.1046 9 12 9.89543 12 11ZM11.8536 3.14645C12.0488 3.34171 12.0488 3.65829 11.8536 3.85355L10.7071 5L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L10 5.70711L8.85355 6.85355C8.65829 7.04882 8.34171 7.04882 8.14645 6.85355C7.95118 6.65829 7.95118 6.34171 8.14645 6.14645L9.29289 5L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L10 4.29289L11.1464 3.14645C11.3417 2.95118 11.6583 2.95118 11.8536 3.14645Z"
              fill="white"
              fillOpacity="0.5"
            />
          </svg>
          <p className={'text-whitegrey font-light'}>We create together</p>
        </div>
      </main>
    </Page>
  );
}
