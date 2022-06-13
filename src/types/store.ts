import { IAsset, IUser } from './index';

export interface IPreviewMedia {
  cid: string;
  hash: string;
  format: string;
  mime: string;
}

export interface ITempAsset {
  cid: string;
  authHash: string;
  previews: IPreviewMedia[];
  hash: string;
  addPreview: (data: any) => void;
  setAsset: (cid: string, authHash: string) => void;
}

export interface ITempToken {
  assets: IAsset[];
  state?: any;
  stateCid?: string;
  previews: IPreviewMedia[];
  addPreview: (data: any) => void;
  addAsset: (asset: IAsset) => void;
  removeAsset: (asset: IAsset) => void;
  setProxy: (proxy: WindowProxy) => void;
  emit: () => void;
  generate: () => void;
  prepare: (snapshot: any) => Promise<void>;
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
  user: IUser | null;
  connectUser: () => Promise<void>;
  disconnectUser: () => Promise<void>;
  initUser: () => Promise<void>;
}
