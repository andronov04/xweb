import { IPFS_PREFIX_URL } from '../constants';

export const ipfsToUrl = (ipfs: string): string => {
  const preIpfs = ipfs.slice(7);
  return `${IPFS_PREFIX_URL}${preIpfs}`;
};
