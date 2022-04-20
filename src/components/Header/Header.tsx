import Menu from '../Menu/Menu';

function Header() {
  return (
    <header id={'header'} className={'flex items-center justify-between'}>
      <div>
        <a href={'/'} className={'flex items-center'}>
          <span>
            <svg width="84" height="44" viewBox="0 0 84 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_4398_235)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 14H6V12H4C1.79086 12 0 13.7909 0 16V28C0 30.2091 1.79086 32 4 32H6V30H4C2.89543 30 2 29.1046 2 28V16C2 14.8954 2.89543 14 4 14Z"
                  fill="white"
                />
                <circle cx="12" cy="28" r="3" stroke="white" strokeWidth="2" />
                <path d="M15 13L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 19L9 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M79 30V18H81V19.0025V20H80C80.2824 19.4906 81.4078 18.6565 81.8941 18.3982C82.3882 18.1327 82.8569 18 83.5 18C84.5353 18 84 18 84 18V20C84 20 83.5725 20 83 20C82.4196 20 81.8451 20.17 81.5 20.5C81.1627 20.83 81 21.4547 81 22V30H79Z"
                  fill="white"
                />
                <path
                  d="M73.5 30C72.8034 30 72.2014 29.8421 71.6739 29.5263C71.1464 29.2105 70.7338 28.7684 70.4362 28.2C70.1454 27.6316 70 26.7614 70 26.0105V22C70 21.2491 70.1454 20.3579 70.4362 19.7895C70.7338 19.2211 71.1464 18.7825 71.6739 18.4737C72.2014 18.1579 72.8135 18 73.5101 18C74.5652 18 75.4106 18.3474 76.0464 19.0421C76.6821 19.7298 77 20.8702 77 22V24H72V22H75C75 21.4667 75.0251 20.7018 74.7275 20.3789C74.4367 20.0561 74.0309 20 73.5101 20C72.9961 20 72.587 20.0561 72.2826 20.3789C71.9783 20.7018 72 21.4667 72 22V26C72 26.5263 71.9783 27.2807 72.2826 27.6105C72.587 27.9404 72.986 28 73.5 28C74.0208 28 74.4367 27.9404 74.7275 27.6105C75.0251 27.2807 75 27.0263 75 26.5V26.0105L77 26V26.2211C77 27.3509 76.6821 28.2632 76.0464 28.9579C75.4106 29.6526 74.5551 30 73.5 30Z"
                  fill="white"
                />
                <path
                  d="M58 30C56.8258 30 55.9215 29.6504 55.2065 28.9512C54.4989 28.2447 54 27.287 54 26.0779V20H52V17.9388H54V15H56V18H58V20H56V26.0779C56 26.6679 56.3468 27.1413 56.6855 27.4982C57.0242 27.8551 57.4355 28 58 28H59V30L58 30Z"
                  fill="white"
                />
                <path
                  d="M67 30C65.8258 30 64.9215 29.6504 64.2065 28.9512C63.4989 28.2447 63 27.287 63 26.0779V20H61V17.9388H63V15H65V18H67V20H65V26.0779C65 26.6679 65.3468 27.1413 65.6855 27.4982C66.0242 27.8551 66.4355 28 67 28H68V30L67 30Z"
                  fill="white"
                />
                <path
                  d="M42 30V18H44V19.0025V20H43C43.2824 19.4906 44.4078 18.6565 44.8941 18.3982C45.3882 18.1327 45.8569 18 46.5 18C47.5353 18 48.3882 18.3327 49 19C49.6196 19.6673 50 20.3377 50 21.5V30L48 30V22C48 21.4547 47.8373 20.83 47.5 20.5C47.1627 20.17 46.5725 20 46 20C45.4196 20 44.8451 20.17 44.5 20.5C44.1627 20.83 44 21.4547 44 22V30H42Z"
                  fill="white"
                />
                <path
                  d="M36.5101 30C35.8135 30 35.2014 29.8421 34.6739 29.5263C34.1464 29.2105 33.7338 28.7684 33.4362 28.2C33.1454 27.6316 33 26.7509 33 26V22C33 21.2491 33.1454 20.3579 33.4362 19.7895C33.7338 19.2211 34.1464 18.7825 34.6739 18.4737C35.2014 18.1579 35.8135 18 36.5101 18C37.5652 18 38.4106 18.3474 39.0464 19.0421C39.6821 19.7298 40 20.8702 40 22V26C40 27.1298 39.6821 28.2632 39.0464 28.9579C38.4106 29.6526 37.5652 30 36.5101 30ZM36.5101 28C37.0309 28 37.4367 27.9404 37.7275 27.6105C38.0251 27.2807 38 26.5263 38 26V22C38 21.4667 38.0251 20.7018 37.7275 20.3789C37.4367 20.0561 37.0208 20 36.5 20C35.986 20 35.587 20.0561 35.2826 20.3789C34.9783 20.7018 35 21.4667 35 22V26C35 26.5263 34.9783 27.2807 35.2826 27.6105C35.587 27.9404 35.9961 28 36.5101 28Z"
                  fill="white"
                />
                <path
                  d="M31 25V26.2148C31 27.347 30.6824 28.2609 30.0472 28.9565C29.412 29.6522 28.563 30 27.5 30C26.4435 30 25.5944 29.6522 24.9528 28.9565C24.3176 28.2609 24 27.1321 24 26V18C24 16.861 24.3176 15.7323 24.9528 15.0435C25.5944 14.3478 26.4435 14 27.5 14C28.563 14 29.412 14.3478 30.0472 15.0435C30.6824 15.7323 31 16.6462 31 17.7852V19H29V18C29 17.4476 29.0037 16.7894 28.7056 16.4552C28.4074 16.1142 28.0056 16 27.5 16C26.9944 16 26.5926 16.1142 26.2944 16.4552C25.9963 16.7894 26 17.4476 26 18V26C26 26.5524 25.9963 27.214 26.2944 27.555C26.5926 27.8892 26.9944 28 27.5 28C28.0056 28 28.4074 27.8892 28.7056 27.555C29.0037 27.214 29 26.7673 29 26.2148V25H31Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_4398_235">
                  <rect width="84" height="44" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </a>
      </div>

      <Menu />
    </header>
  );
}

export default Header;
