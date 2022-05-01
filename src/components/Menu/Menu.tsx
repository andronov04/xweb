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
                  <div className={'italic cursor-pointer'} onClick={connectUser}>
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
