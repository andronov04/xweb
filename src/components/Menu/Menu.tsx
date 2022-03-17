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
        <ol className={'flex text-inactive gap-x-5 text-2xl'}>
          <li className={`hover:text-active ${router.pathname.startsWith('/explore') && 'text-active'}`}>
            <Link href={'/explore'}>
              <a href={'/explore'}>explore</a>
            </Link>
          </li>
          <li className={`hover:text-active ${router.pathname.startsWith('/marketplace') && 'text-active'}`}>
            <Link href={'/marketplace'}>
              <a href={'/marketplace'}>marketplace</a>
            </Link>
          </li>
          <li className={`hover:text-active ${router.pathname.startsWith('/create') && 'text-active'}`}>
            <Link href={'/create'}>
              <a href={'/create'}>create</a>
            </Link>
          </li>
          <li className={`hover:text-active ${router.pathname.startsWith('/[id]') && 'text-active'}`}>
            {user ? (
              <Link href={`/@${user.username ?? user.id}`}>
                <a href={`/@${user.username ?? user.id}`}>profile</a>
              </Link>
            ) : (
              <div className={'cursor-pointer'} onClick={connectUser}>
                connect wallet
              </div>
            )}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Menu;
