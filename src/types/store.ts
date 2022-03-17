import { IAsset } from './index';

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

export interface IStore {
  asset: ITempAsset;
  art: ITempArt;
}
