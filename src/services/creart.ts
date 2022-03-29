import { IAsset } from '../types';
import { DEV_ASSET_URL, EDITOR_URL, MESSAGE_GENERATE_NEW, MESSAGE_GET_ASSET_META, MESSAGE_GET_DIGEST } from '../constants';
import { ipfsToUrl } from '../utils';
import { nanoid } from 'nanoid';

export class CreArt {
  assets: IAsset[] = [];
  digest: string = '';
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

    if (!assets.length) {
      this.setDigest('');
    }
  };

  sendAssets = () => {
    // TODO Configuration order
    //  asset.asset?.metadata?.artifactUri;
    // this.proxy?.postMessage(
    //   {
    //     type: MESSAGE_SEND_ASSET,
    //     data: this.assets.map((a, i) => {
    //       return {
    //         // asset: { ...a, metadata: { name: a.name, artifactUri: DEV_ASSET_URL } }, // TODO Remove test
    //         asset: a,
    //         order: i
    //         // url: ipfsToUrl(a.metadata?.displayUri ?? ''),
    //         // url: DEV_ASSET_URL ?? 'http://localhost:8001'
    //       };
    //     })
    //   },
    //   EDITOR_URL
    // );
  };

  emit = () => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data?.type === MESSAGE_GET_DIGEST) {
          // console.log('MESSAGE_GET_DIGEST', event.data);
          this.setDigest(event.data.data.digest);
        }
      },
      false
    );
  };

  setDigest = (digest: string) => {
    this.digest = digest;
    const el = document.querySelector('#digest'); // TEMP
    if (el) {
      el.innerHTML = this.digest;
    }
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
