import { IAsset } from '../types';
import { DEV_ASSET_URL, EDITOR_URL, MESSAGE_SEND_ASSET } from '../constants';
import { ipfsToUrl } from '../utils';

export class CreArt {
  assets: IAsset[] = [];
  proxy: WindowProxy | null = null;

  constructor() {
    //
  }

  setProxy = (proxy: WindowProxy) => {
    this.proxy = proxy;
  };

  setAssets = (assets: IAsset[]) => {
    this.assets = assets;

    this.sendAssets();
  };

  sendAssets = () => {
    this.proxy?.postMessage(
      {
        type: MESSAGE_SEND_ASSET,
        data: this.assets.map((a) => {
          return {
            asset: a,
            // url: ipfsToUrl(a.metadata?.displayUri ?? ''),
            url: DEV_ASSET_URL ?? 'http://localhost:8001'
          };
        })
      },
      EDITOR_URL
    );
  };
}
