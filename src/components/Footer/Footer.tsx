import Link from 'next/link';

function Footer() {
  return (
    <footer className={'flex pb-5 justify-between items-center'}>
      <div className={'flex  text-base gap-x-6 items-center'}>
        <div className={'flex items-center gap-x-2.5'}>
          <svg style={{ marginTop: '-2px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6 4H7V3H6C4.89543 3 4 3.89543 4 5V11C4 12.1046 4.89543 13 6 13H7V12H6C5.44772 12 5 11.5523 5 11V5C5 4.44772 5.44772 4 6 4ZM10 12C9.44771 12 9 11.5523 9 11C9 10.4477 9.44771 10 10 10C10.5523 10 11 10.4477 11 11C11 11.5523 10.5523 12 10 12ZM12 11C12 12.1046 11.1046 13 10 13C8.89543 13 8 12.1046 8 11C8 9.89543 8.89543 9 10 9C11.1046 9 12 9.89543 12 11ZM11.8536 3.14645C12.0488 3.34171 12.0488 3.65829 11.8536 3.85355L10.7071 5L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L10 5.70711L8.85355 6.85355C8.65829 7.04882 8.34171 7.04882 8.14645 6.85355C7.95118 6.65829 7.95118 6.34171 8.14645 6.14645L9.29289 5L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L10 4.29289L11.1464 3.14645C11.3417 2.95118 11.6583 2.95118 11.8536 3.14645Z"
              fill="white"
              fillOpacity="0.5"
            />
          </svg>
          <p className={'text-whitegrey '}>beta v0.0.2</p>
        </div>
        <div className={'text-whitegrey'}>
          powered by{' '}
          <a className={'text-inactive hover:opacity-90 cursor-pointer'} href="https://tzkt.io/" target="_blank" rel="noreferrer">
            tzkt
          </a>{' '}
          &{' '}
          <a className={'text-inactive hover:opacity-90 cursor-pointer'} href="https://smartpy.io/" target="_blank" rel="noreferrer">
            SmartPy
          </a>
        </div>
      </div>

      <div className={'w-auto'}>
        <nav>
          <ol className={'text-inactive flex gap-x-6'}>
            <li>
              <Link href={'/code-of-conduct'}>
                <a href={'/code-of-conduct'} className={'hover:opacity-90 cursor-pointer'}>
                  Code of Conduct
                </a>
              </Link>
            </li>
            <li>
              <Link href={'mailto:support@contter.com'}>
                <a href={'mailto:support@contter.com'} className={'hover:opacity-90 cursor-pointer'}>
                  Support
                </a>
              </Link>
            </li>
            <li>
              <Link href={'https://twitter.com/contter'}>
                <a target={'_blank'} rel={'noreferrer'} className={'hover:opacity-90 cursor-pointer'} href={'https://twitter.com/contter'}>
                  Twitter
                </a>
              </Link>
            </li>
            <li>
              <Link href={'https://discord.gg/jAdcbHAbQE'}>
                <a target={'_blank'} rel={'noreferrer'} className={'hover:opacity-90 cursor-pointer'} href={'https://discord.gg/jAdcbHAbQE'}>
                  Discord
                </a>
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
