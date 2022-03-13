const Breadcrumbs = ({ navs }: { navs: { name: string; url?: string; active: boolean }[] }) => {
  return (
    <nav className="flex font-thin" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {navs
          .filter((a) => a.name)
          .map((nav, i) => (
            <li key={nav.name} className="inline-flex items-center">
              {i > 0 && <span>/</span>}
              <a href="" className={`${i > 0 ? 'ml-2' : ''} inline-flex items-center ${nav.active ? '' : 'text-inactive'} text-sm`}>
                {nav.name}
              </a>
            </li>
          ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
