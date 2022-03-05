import { useRouter } from 'next/router';
import Link from 'next/link';

interface INavLink {
  displayName: string;
  url: string;
  startsWith?: string;
  pathname?: string;
}

interface INav {
  links: INavLink[];
}

const Navs = ({ links }: INav) => {
  const router = useRouter();
  return (
    <nav>
      <ol className={'text-xl flex gap-x-10 text-inactive'}>
        {links.map((link) => (
          <li
            key={link.url}
            className={`hover:text-active ${
              (link.startsWith ? router.pathname.startsWith(link.startsWith) : router.pathname === link.pathname) && 'text-active'
            }`}
          >
            <Link href={link.url}>
              <a href={link.url}>{link.displayName}</a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Navs;
