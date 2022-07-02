export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const RPC_LIST =
  process.env.NEXT_PUBLIC_RPC_LIST ??
  'https://rpc.tzbeta.net,https://mainnet.smartpy.io,https://mainnet.api.tez.ie,https://mainnet-tezos.giganode.io,https://teznode.letzbake.com';
// https://rpc.contter.com,
// https://ithacanet.ecadinfra.com,https://ithacanet.smartpy.io,https://rpczero.tzbeta.net
export const TZ_NETWORK = process.env.NEXT_PUBLIC_TZ_NETWORK ?? 'mainnet';
export const PUBLIC_MODE = process.env.NEXT_PUBLIC_MODE ?? 'prod';
export const IS_DEV = PUBLIC_MODE === 'dev';
export const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? 'https://graphql3.contter.com/v1/graphql';
export const GRAPHQL_API_WS_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_WS_URL ?? 'wss://graphql3.contter.com/v1/graphql';
export const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY ?? '';
export const IPFS_PREFIX_URL = process.env.NEXT_PUBLIC_IPFS_PREFIX_URL ?? 'https://contter.mypinata.cloud/ipfs/';
export const S3_SUFFIX_URL = process.env.NEXT_PUBLIC_S3_SUFFIX_URL ?? '/s3/';
export const IPFS_BASE_PREFIX_URL = process.env.NEXT_PUBLIC_IPFS_BASE_PREFIX_URL ?? 'https://contter.mypinata.cloud/ipfs/';
export const MINI_LOGO_URL = process.env.NEXT_PUBLIC_MINI_LOGO_URL ?? 'https://contter.mypinata.cloud/ipfs/QmPD9ZiRqjxp8DktWhJ1zzsQ8z6S34G7oBjwUbNwLaXPHw';
export const TZKT_URL = process.env.NEXT_PUBLIC_TZKT_URL ?? 'https://tzkt.io/';
export const ITEMS_PER_PAGE: number = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE ?? '25') ?? 25;
export const MAX_TZ_WAITING_TIMEOUT: number = parseInt(process.env.NEXT_PUBLIC_MAX_TZ_WAITING_TIMEOUT ?? '300') ?? 300;
export const IMAGE_SEO = process.env.NEXT_PUBLIC_IMAGE_SEO ?? 'https://contter.mypinata.cloud/ipfs/QmP6B8MUcV5sBsZ2ie9DhLfzYKeDkYfExuYaGRuBhf8Nn1';
export const DESCRIPTION_SEO = process.env.NEXT_PUBLIC_DESCRIPTION_SEO ?? 'The web3 design platform and NFT marketplace on the Tezos blockchain';
export const EDITOR_URL = process.env.NEXT_PUBLIC_EDITOR_URL ?? 'https://contter.mypinata.cloud/ipfs/QmRLRWonDRjka4XR9XrLwY9Me1c3WvgFcA5Yg9rWXAgjWa?editor=1';
export const MESSAGE_GENERATE_NEW = 'X_GENERATE_NEW';
export const MESSAGE_GET_DIGEST = 'X_GET_GET_DIGEST';
export const MESSAGE_GET_CAPTURE_IMG = 'X_GET_CAPTURE_IMG';
export const USE_PREPARE = 'X_PREPARE';
export const RESPONSE_PREPARE = 'X_RESPONSE_PREPARE';
export const USE_GET_CAPTURE = 'X_GET_CAPTURE';
export const USE_REQUEST_CAPTURE = 'X_REQUEST_CAPTURE';
export const USE_RESPONSE_CAPTURE = 'X_RESPONSE_CAPTURE';
export const USE_COMPLETE_CAPTURE = 'X_COMPLETE_CAPTURE';
export const USE_REQUEST_TOKEN_CAPTURE = 'X_REQUEST_TOKEN_CAPTURE';
export const USE_RESPONSE_TOKEN_CAPTURE = 'X_RESPONSE_TOKEN_CAPTURE';
export const USE_REQUEST_ASSET_CAPTURE = 'X_REQUEST_ASSET_CAPTURE';
export const USE_RESPONSE_ASSET_CAPTURE = 'X_RESPONSE_ASSET_CAPTURE';
export const USE_SET_THEME = 'X_USE_SET_THEME';
export const FILE_API_ASSET_URL = process.env.NEXT_PUBLIC_FILE_API_ASSET_URL ?? 'https://api2.contter.com/upload/file/asset';
export const FILE_API_CAPTURE_URL = process.env.NEXT_PUBLIC_FILE_API_CAPTURE_URL ?? 'https://api2.contter.com/upload/file';
export const FILE_API_STATE_URL = process.env.NEXT_PUBLIC_FILE_API_STATE_URL ?? 'https://api2.contter.com/upload/token/state';
export const FILE_API_PROFILE_IMG_URL = process.env.NEXT_PUBLIC_FILE_API_PROFILE_IMG_URL ?? 'https://api2.contter.com/upload/file/profile/img';
export const API_META_ASSET_URL = process.env.NEXT_PUBLIC_API_META_ASSET_URL ?? 'https://api2.contter.com/upload/asset/metadata';
export const API_META_TOKEN_URL = process.env.NEXT_PUBLIC_API_META_TOKEN_URL ?? 'https://api2.contter.com/upload/token/metadata';
export const API_META_PROFILE_URL = process.env.NEXT_PUBLIC_API_META_PROFILE_URL ?? 'https://api2.contter.com/upload/profile/metadata';
export const API_BUILD_TOKEN_URL = process.env.NEXT_PUBLIC_API_BUILD_TOKEN_URL ?? 'https://api2.contter.com/upload/token';
export const API_TOKEN_DOWNLOAD_URL = process.env.NEXT_PUBLIC_API_TOKEN_DOWNLOAD_URL ?? 'https://api2.contter.com/download/token';
export const IFRAME_ALLOW = process.env.NEXT_PUBLIC_IFRAME_ALLOW ?? 'gyroscope; accelerometer; xr-spatial-tracking; microphone; camera;';
export const IFRAME_SANDBOX = process.env.NEXT_PUBLIC_IFRAME_SANDBOX ?? 'allow-same-origin allow-modals allow-scripts';
// Contracts
export const TZ_ADDRESS_ASSET = process.env.NEXT_PUBLIC_TZ_ADDRESS_ASSET ?? '';
export const TZ_ADDRESS_TOKEN = process.env.NEXT_PUBLIC_TZ_ADDRESS_TOKEN ?? '';
export const TZ_ADDRESS_MARKETPLACE = process.env.NEXT_PUBLIC_TZ_ADDRESS_MARKETPLACE ?? '';
export const TZ_ADDRESS_PROFILE = process.env.NEXT_PUBLIC_TZ_ADDRESS_PROFILE ?? '';
// Mimetypes
export const IMAGE_MIMETYPES = ['image/avif', 'image/png', 'image/jpeg', 'image/jpg'];

export const MOULDER_CMD_STATUS = 'MOULDER_CMD_STATUS';
export const MOULDER_CMD_REQUEST_CAPTURE = 'MOULDER_CMD_REQUEST_CAPTURE';
export const MOULDER_CMD_RESPONSE_CAPTURE = 'MOULDER_CMD_RESPONSE_CAPTURE';
export const MOULDER_CMD_SET_CONF = 'MOULDER_CMD_SET_CONF';
export const MOULDER_CMD_ADD_ASSET = 'MOULDER_CMD_ADD_ASSET';
export const MOULDER_CMD_REMOVE_ASSET = 'MOULDER_CMD_REMOVE_ASSET';
export const TZP_PROFILE_URL = 'https://indexer.tzprofiles.com/v1/graphql';
export const CNTTR_CMD_MINT = 'CNTTR_CMD_MINT';
export const URL = () => `${document.location.protocol}//${document.location.host}`;
// s3 - dutosyxgruo37.cloudfront.net
