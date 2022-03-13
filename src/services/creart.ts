import { IAsset } from '../types';
import { DEV_ASSET_URL, EDITOR_URL, MESSAGE_GENERATE_NEW, MESSAGE_GET_ASSET_META, MESSAGE_SEND_ASSET } from '../constants';
import { ipfsToUrl } from '../utils';
import { nanoid } from 'nanoid';

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
    // TODO Configuration order
    //  asset.asset?.metadata?.artifactUri;
    this.proxy?.postMessage(
      {
        type: MESSAGE_SEND_ASSET,
        data: this.assets.map((a, i) => {
          return {
            asset: { ...a, metadata: { name: a.name, artifactUri: DEV_ASSET_URL } }, // TODO Remove test
            order: i
            // url: ipfsToUrl(a.metadata?.displayUri ?? ''),
            // url: DEV_ASSET_URL ?? 'http://localhost:8001'
          };
        })
      },
      EDITOR_URL
    );
  };

  emit = () => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data?.type === MESSAGE_GET_ASSET_META) {
          // console.log('WEB', event.data, this.assets);
        }
      },
      false
    );
  };

  generate = () => {
    this.proxy?.postMessage(
      {
        type: MESSAGE_GENERATE_NEW,
        data: {
          requestId: nanoid()
        }
      },
      EDITOR_URL
    );
  };
}
