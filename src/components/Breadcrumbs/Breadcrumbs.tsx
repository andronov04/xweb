// TODO Fix use props
const Breadcrumbs = () => {
  return (
    <nav className="flex font-thin" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a href="#" className="inline-flex items-center   text-inactive text-sm">
            Editor
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <span>/</span>
            <a href="#" className="ml-2 text-sm">
              Your Art
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <span>/</span>
            <span className="ml-2 text-sm  text-inactive">Basic</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
