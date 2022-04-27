import Link from 'next/link';

const FAQ = () => {
  const navs = [
    {
      title: 'What is Contter?',
      key: 'contter',
      desc: () => {
        // return <div>TA collaborative platform, где каждый может создать, продать и купить NFT творения.</div>;
        return (
          <div>
            <p>The web3 design platform and NFT marketplace on the Tezos blockchain.</p>
            {/*<Spacing size={0.5} />*/}
            <p>The platform where anyone can create, sell and buy NFT tokens.</p>
          </div>
        );
      }
    },
    {
      title: 'What makes Contter different from the others?',
      key: 'different',
      desc: () => {
        return (
          <div>
            <p>Every NFT Token created with our platform is unique. Parameters of generated tokens can’t be reused to create new tokens.</p>

            <p>Users can create tokens even without possessing any designing or programming skills.</p>
          </div>
        );
      }
    },
    {
      title: 'How do i create and mint?',
      key: 'mint',
      desc: () => {
        return (
          <div>
            <p>Go to the token creation page, where you will gain access to the editor and assets.</p>
            <p>In the beta you can only use one asset.</p>
            <p>You can’t upload tokens from other sources to this platform (however, you can upload assets).</p>
          </div>
        );
      }
    },
    {
      title: 'What is an asset?',
      key: 'asset',
      desc: () => {
        return (
          <div>
            <p>
              It is any item (tool) that can be used in the editor to create your token. An asset is created outside of the platform with Moulder Framework
              (further information is available on the asset creation page). All assets are free to use, but every asset gets royalties from the sell.
            </p>
          </div>
        );
      }
    },
    {
      title: 'How does the editor work?',
      key: 'editor',
      desc: () => {
        return (
          <div>
            <p>
              It is an environment of assets, tools and other features that provide clear and simple experience of token creation. By changing asset parameters
              you can generate different design variations.
            </p>
          </div>
        );
      }
    },
    {
      title: 'How do royalties work?',
      key: 'royalties',
      desc: () => {
        return (
          <div>
            <p>0-20% for creator of the token.</p>
            <p>
              0-20% for creator of the asset. If several assets from different creators were used in the token, then royalties are calculated based on the
              percentage of the use of every asset. If the final sum is more than 20%, then every asset’s percentage of 20% is calculated (i.e. percentage of a
              percentage is calculated and in this equation 20% acts like 100%).
            </p>
          </div>
        );
      }
    },
    {
      title: 'What about the platform fees?',
      key: 'fees',
      desc: () => {
        return (
          <div>
            <p>3% of token purchase.</p>
          </div>
        );
      }
    },
    {
      title: 'What about the copyright?',
      key: 'copyright',
      desc: () => {
        return (
          <div>
            <p>
              Creator of the token owns copyright to this token. Creator of the asset owns copyright to this asset, but not to the tokens created with this
              asset. More on licensing and copyright (
              <Link href={'/code-of-conduct'}>
                <a href={'/code-of-conduct'} className={'hover:opacity-80 cursor-pointer underline'}>
                  paragraph 10 in Code of Conduct
                </a>
              </Link>
              ).
            </p>
            <br />
            <p>
              <Link href={'mailto:support@contter.com'}>
                <a href={'mailto:support@contter.com'} className={'hover:opacity-80 cursor-pointer underline'}>
                  Contact us
                </a>
              </Link>{' '}
              if you suspect someone or something violates the copyright.
            </p>
          </div>
        );
      }
    },
    {
      title: 'Which technologies are used?',
      key: 'technologies',
      desc: () => {
        return (
          <div>
            <p>
              Platform uses Tezos blockchain. All assets and tokens are stored in distributed file system (IPFS). Smart contracts are written in SmartPy.
              tzkt.io is used for indexation and API.
            </p>
            <br />
            <p>Moulder Framework is used for asset creation (distributed under free-software license).</p>
          </div>
        );
      }
    },
    {
      title: 'What are our plans for the future?',
      key: 'future',
      desc: () => {
        return (
          <div>
            <p>Go to a stable version of the platform. Support of multiple assets, which will allow to create even more marvelous artworks, is in plans.</p>
          </div>
        );
      }
    },
    {
      title: 'What do you mean by beta version?',
      key: 'beta',
      desc: () => {
        return (
          <div>
            <p>
              There can be bugs and errors present, for which we apologize in advance. Furthermore, in the future we may update contracts, API, UI/UX, etc. We
              announce all updates for this platform on our{' '}
              <Link href={'https://discord.gg/jAdcbHAbQE'}>
                <a target={'_blank'} href={'https://discord.gg/jAdcbHAbQE'} rel={'noreferrer'} className={'hover:opacity-80 cursor-pointer underline'}>
                  discord server
                </a>
              </Link>
              .
            </p>
          </div>
        );
      }
    },
    {
      title: 'Still have questions?',
      key: 'questions',
      desc: () => {
        return (
          <div>
            Contact us at{' '}
            <Link href={'mailto:support@contter.com'}>
              <a href={'mailto:support@contter.com'} className={'hover:opacity-80 cursor-pointer underline'}>
                support@contter.com
              </a>
            </Link>{' '}
            or visit our{' '}
            <Link href={'https://discord.gg/jAdcbHAbQE'}>
              <a target={'_blank'} href={'https://discord.gg/jAdcbHAbQE'} rel={'noreferrer'} className={'hover:opacity-80 cursor-pointer underline'}>
                discord server
              </a>
            </Link>
            .
          </div>
        );
      }
    }
  ];

  return (
    <div className={'space-y-6 font-normal'}>
      <h2 className={'md:text-2xl text-xl md:mt-0 mt-10 md:mb-10 mb-5'}>Frequently asked questions</h2>
      {navs.map((a) => (
        <div className={'md:text-xl text-base'} id={a.key} key={a.key}>
          <h2>{a.title}</h2>
          <div className={' text-whitegrey md:text-lg'}>{a.desc()}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
