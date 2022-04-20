import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from '../../store';
import shallow from 'zustand/shallow';

const Menu = () => {
  const [user, connectUser] = useStore((state) => [state.user, state.connectUser], shallow);
  const router = useRouter();

  return (
    <div>
      <nav>
        <ol style={{ fontSize: '1.3rem', fontWeight: 400 }} className={'flex items-center text-inactive gap-x-5 font-medium text-xl'}>
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
              <div className={'py-1 px-2  rounded-lg border-2 border-white border-solid cursor-pointer'} onClick={connectUser}>
                Connect Wallet
              </div>
            )}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Menu;
