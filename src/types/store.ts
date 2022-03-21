import { IAsset, IUser } from './index';

export interface ITempAsset {
  kind: 'style' | null;
  cid: string;
  requestHash: string;
  previews: string[];
  hash: string;
  setPreview: (previews: string[], hash: string) => void;
  setAsset: (cid: string, requestHash: string, kind: 'style') => void;
}

export interface ITempArt {
  assets: IAsset[];
  setAssets: (assets: IAsset[]) => void;
  setProxy: (proxy: WindowProxy) => void;
  emit: () => void;
  generate: () => void;
  digest: string;
}

export interface IMessageBar {
  kind: 'error' | 'warn' | 'info' | 'success';
  title: string;
  description?: string;
}

export interface IStore {
  asset: ITempAsset;
  art: ITempArt;

  message: IMessageBar | null;
  setMessage: (message: IMessageBar | null) => void;

  user: IUser | null;
  connectUser: () => Promise<void>;
  initUser: () => Promise<void>;
}