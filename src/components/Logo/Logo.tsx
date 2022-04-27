const Logo = () => {
  return (
    <div className={'relative'}>
      <div
        id={'logo_square'}
        style={{ width: '38px', height: '38px' }}
        className={'transition-transform ease-linear duration-500 rotate-90 group-hover:rotate-0'}
      >
        <svg className={'absolute z-10 top-0 left-0'} width="38" height="38" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M146 296V270H120V296C120 324.719 143.281 348 172 348H328C356.719 348 380 324.719 380 296V270H354V296C354 310.359 342.359 322 328 322H172C157.641 322 146 310.359 146 296Z"
            fill="white"
          />
          <path d="M133 153L211 231" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M211 153L133 231" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="276" y="179" width="104" height="26" rx="13" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M146 296V270H120V296C120 324.719 143.281 348 172 348H328C356.719 348 380 324.719 380 296V270H354V296C354 310.359 342.359 322 328 322H172C157.641 322 146 310.359 146 296Z"
            fill="white"
          />
          <path d="M133 153L211 231" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M211 153L133 231" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <svg
          style={{
            transformOrigin: '50% 38%'
          }}
          className={'absolute transition-transform ease-linear group-hover:scale-y-0 duration-300 z-20 top-0 left-0 delay-700'}
          width="38"
          height="38"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle fill={'#000'} cx="328" cy="192" r="39" transform="rotate(-90 328 192)" stroke="white" strokeWidth="26" />
        </svg>
      </div>
    </div>
  );
};

export default Logo;
