import { IPFS_PREFIX_URL, S3_SUFFIX_URL } from '../constants';

export const ipfsToUrl = (ipfs: string): string => {
  const preIpfs = ipfs.slice(7);
  return `${IPFS_PREFIX_URL}${preIpfs}`;
};

export const s3ToUrl = (ipfs: string): string => {
  const preIpfs = ipfs.slice(7);
  return `${S3_SUFFIX_URL}${preIpfs}`;
};

export const urlToIpfs = (ipfs: string): string => {
  return `ipfs://${ipfs}`;
};

export const getNumDecimals = (x: number): number => {
  const mt = Math.floor(Math.abs(x));
  const st = (mt / 1000000).toString();
  const splits = st.split('.');
  return splits.length > 1 ? splits.pop()?.length || 0 : 0;
};

export const displayPrice = (num: number, maxDec?: number): number | string => {
  let decimals = getNumDecimals(num);
  decimals = maxDec != null ? Math.min(maxDec, decimals) : decimals;
  const mutez = num / 1000000;
  const decim = mutez - Math.floor(mutez);
  return ((decim * 10 ** decimals) | 0) > 0 ? mutez.toFixed(decimals) : Math.floor(mutez);
};

export const displayRoyalty = (royalty: number): string => {
  const num = royalty / 10;
  let str = `${num.toFixed(1)}%`;
  if (Number.isInteger(num)) {
    str = `${num}%`;
  }
  return str;
};

export const RN = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// TODO FROM SDK
export const generateHash = () => {
  const chars = 'abcdefABCDEF0123456789';
  let result = 'x01'; // version
  for (let i = 52; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};
