import { IPFS_PREFIX_URL } from '../constants';

export const ipfsToUrl = (ipfs: string): string => {
  const preIpfs = ipfs.slice(7);
  return `${IPFS_PREFIX_URL}${preIpfs}`;
};

export const urlToIpfs = (ipfs: string): string => {
  return `ipfs://${ipfs}`;
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
