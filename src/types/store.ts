import { IAsset, IUser } from './index';

export interface IPreviewMedia {
  cid: string;
  hash: string;
  // mimetype
}

export interface ITempAsset {
  cid: string;
  authHash: string;
  previews: IPreviewMedia[];
  hash: string;
  addPreview: (cid: string, hash: string) => void;
  setAsset: (cid: string, authHash: string) => void;
}

export interface ITempToken {
  assets: IAsset[];
  state?: any;
  previews: IPreviewMedia[];
  addPreview: (cid: string, hash: string) => void;
  addAsset: (asset: IAsset) => void;
  removeAsset: (asset: IAsset) => void;
  setProxy: (proxy: WindowProxy) => void;
  emit: () => void;
  generate: () => void;
  prepare: () => Promise<void>;
  digest: string;
  isProxy: boolean;
  cid: string;

  setCid: (cid: string) => void;
}

export interface IMessageBar {
  kind?: 'error' | 'warn' | 'info' | 'success';
  title?: string;
  description?: string;
  autoClose?: number | boolean;
  block?: boolean;
  clear?: boolean;
}

export interface IStore {
  asset: ITempAsset;
  token: ITempToken;

  user: IUser | null;
  connectUser: () => Promise<void>;
  disconnectUser: () => Promise<void>;
  initUser: () => Promise<void>;
}
