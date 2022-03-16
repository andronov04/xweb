// import { IAsset } from '../types';

import { IAssetMetadata } from '../types/metadata';
import { urlToIpfs } from '../utils';
import { postDataFetch } from '../api/RestApi';
import { API_META_ASSET_URL } from '../constants';

export class CreAsset {
  cid;
  requestHash;
  previewImages: string[] = [];
  hash;

  constructor() {
    this.cid = 'QmVRhsPuMpWDhLUCh87Uwt1kUkuAJ3eYDQYi2oBU4zGYK6'; /// TODO Debug delete after
  }

  initAsset = (cid: string, requestHash: string) => {
    this.cid = cid;
    this.requestHash = requestHash;
  };

  setPreview = (images: string[], hash: string) => {
    this.previewImages = images;
    this.hash = hash;
  };

  publish = (data: any) => {
    // Need validation again?
    console.log('publish:::', data, this.hash, this.cid, this.previewImages);
    if (!this.previewImages.length) {
      return;
    }
    const previewImage = this.previewImages[0];

    // Generate meta
    const tags = (data.tags?.split(',') ?? []).filter((a) => a.length);
    const metadata: IAssetMetadata = {
      name: data.name,
      description: data.description,
      tags: tags,
      artifactUri: `${urlToIpfs(this.cid)}?xhash=${this.hash}`,
      displayUri: urlToIpfs(previewImage),
      thumbnailUri: urlToIpfs(previewImage),
      symbol: 'AASSET',
      decimals: 0,
      version: '0.1'
    };

    console.log('metadata', metadata);
    postDataFetch(API_META_ASSET_URL, metadata).then(async (response) => {
      console.log('emta', await response.json());
    });
  };
}
