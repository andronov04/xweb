import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';
import Popup from 'reactjs-popup';

const Menu = () => {
  const [user, connectUser] = useStore((state) => [state.user, state.connectUser], shallow);
  const router = useRouter();

  return (
    <div>
      <nav style={{ marginTop: '0.2rem' }}>
        <ol className={'flex md:flex-row flex-col items-center text-inactive gap-x-8 font-normal text-xl'}>
          <li className={`hover:text-active ${router.pathname.startsWith('/explore') && 'text-active'}`}>
            <Link href={'/explore'}>
              <a href={'/explore'}>Explore</a>
            </Link>
          </li>
          <li className={`hover:text-active ${router.pathname.startsWith('/marketplace') && 'text-active'}`}>
            <Link href={'/marketplace'}>
              <a href={'/marketplace'}>Marketplace</a>
            </Link>
          </li>
          <li className={`hover:text-active ${router.pathname.startsWith('/assets') && 'text-active'}`}>
            <Link href={'/assets'}>
              <a href={'/assets'}>Assets</a>
            </Link>
          </li>
          <Popup
            trigger={() => (
              <div style={{ columnGap: '0.3rem' }} className={'cursor-pointer flex items-center gap-x-1.5'}>
                More
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4L6 8L2 4" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            on={['click']}
            position="bottom center"
            closeOnDocumentClick
          >
            <nav className={'bg-black20 text-lg  rounded-md px-6 py-3 text-whitegrey flex flex-col'}>
              <Link href={'https://twitter.com/contter'}>
                <a
                  target={'_blank'}
                  rel={'noreferrer'}
                  className={'outline-none select-none hover:opacity-90 cursor-pointer'}
                  href={'https://twitter.com/contter'}
                >
                  Twitter
                </a>
              </Link>
              <Link href={'https://discord.gg/jAdcbHAbQE'}>
                <a
                  target={'_blank'}
                  rel={'noreferrer'}
                  className={'outline-none select-none hover:opacity-90 cursor-pointer'}
                  href={'https://discord.gg/jAdcbHAbQE'}
                >
                  Discord
                </a>
              </Link>
            </nav>
          </Popup>
          <li className={`hover:text-active ${router.pathname.startsWith('/create') && 'text-active'}`}>
            <Link href={'/create'}>
              <a href={'/create'}>Create</a>
            </Link>
          </li>
          <li className={`hover:text-active ${router.pathname.startsWith('/[id]') && 'text-active'}`}>
            {user ? (
              <Link href={`/@${user.username ?? user.id}`}>
                <a href={`/@${user.username ?? user.id}`}>Profile</a>
              </Link>
            ) : (
              <Popup
                trigger={() => (
                  <div className={'cursor-pointer'} onClick={connectUser}>
                    Connect Wallet
                  </div>
                )}
                on={['hover', 'focus']}
                position="bottom right"
                closeOnDocumentClick
              >
                <p className={'bg-black20 rounded-md px-4 py-3 text-whitegrey '}>
                  By connecting your wallet, you <br />
                  agree to our{' '}
                  <Link href={'/code-of-conduct'}>
                    <a href={'/code-of-conduct'} className={'text-inactive outline-none select-none cursor-pointer hover:opacity-80'}>
                      Code of Conduct
                    </a>
                  </Link>
                </p>
              </Popup>
            )}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Menu;
