export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const RPC_LIST = process.env.NEXT_PUBLIC_RPC_LIST ?? 'https://mainnet.api.tez.ie,https://mainnet.smartpy.io';
export const TZ_NETWORK = process.env.NEXT_PUBLIC_TZ_NETWORK ?? 'hangzhounet';
export const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? 'https://graph.art3s.xyz/v1/graphql';
export const GRAPHQL_API_WS_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_WS_URL ?? 'wss://graph.art3s.xyz/v1/graphql';
export const GRAPHQL_API_KEY = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY ?? '';
export const IPFS_PREFIX_URL = process.env.NEXT_PUBLIC_IPFS_PREFIX_URL ?? 'https://contter.mypinata.cloud/ipfs/';
export const ITEMS_PER_PAGE = process.env.NEXT_PUBLIC_ITEMS_PER_PAGE ?? 10;
export const IMAGE_SEO = process.env.NEXT_PUBLIC_IMAGE_SEO ?? 'https://contter.mypinata.cloud/ipfs/QmP6B8MUcV5sBsZ2ie9DhLfzYKeDkYfExuYaGRuBhf8Nn1';
export const DESCRIPTION_SEO = process.env.NEXT_PUBLIC_DESCRIPTION_SEO ?? 'The web3 design platform and NFT marketplace on the Tezos blockchain';
export const EDITOR_URL = process.env.NEXT_PUBLIC_EDITOR_URL ?? 'https://xeditor-dun.vercel.app/';
export const MESSAGE_GENERATE_NEW = 'X_GENERATE_NEW';
export const MESSAGE_GET_DIGEST = 'X_GET_GET_DIGEST';
export const MESSAGE_GET_CAPTURE_IMG = 'X_GET_CAPTURE_IMG';
export const USE_ADD_ASSET = 'X_ADD_ASSET';
export const USE_REMOVE_ASSET = 'X_REMOVE_ASSET';
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
export const FILE_API_ASSET_STYLE_URL = process.env.NEXT_PUBLIC_FILE_API_ASSET_STYLE_URL ?? 'https://api.art3s.xyz/upload/file/asset/style';
export const FILE_API_CAPTURE_IMG_URL = process.env.NEXT_PUBLIC_FILE_API_CAPTURE_IMG_URL ?? 'https://api.art3s.xyz/upload/file/img';
export const API_META_ASSET_URL = process.env.NEXT_PUBLIC_API_META_ASSET_URL ?? 'https://api.art3s.xyz/upload/asset/metadata';
export const API_META_TOKEN_URL = process.env.NEXT_PUBLIC_API_META_TOKEN_URL ?? 'https://api.art3s.xyz/upload/token/metadata';
export const API_BUILD_TOKEN_URL = process.env.NEXT_PUBLIC_API_BUILD_TOKEN_URL ?? 'https://api.art3s.xyz/upload/token';
export const IFRAME_ALLOW = process.env.NEXT_PUBLIC_IFRAME_ALLOW ?? 'gyroscope; accelerometer; xr-spatial-tracking; microphone; camera;';
export const IFRAME_SANDBOX = process.env.NEXT_PUBLIC_IFRAME_SANDBOX ?? 'allow-same-origin allow-scripts';
// Contracts
export const TZ_ADDRESS_ASSET = process.env.NEXT_PUBLIC_TZ_ADDRESS_ASSET ?? '';
export const TZ_ADDRESS_TOKEN = process.env.NEXT_PUBLIC_TZ_ADDRESS_TOKEN ?? '';
export const TZ_ADDRESS_MARKETPLACE = process.env.NEXT_PUBLIC_TZ_ADDRESS_MARKETPLACE ?? '';
// Mimetypes
export const IMAGE_MIMETYPES = ['image/png'];
