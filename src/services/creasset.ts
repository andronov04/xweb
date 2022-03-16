// import { IAsset } from '../types';

export class CreAsset {
  cid;
  requestHash;
  constructor() {
    //
  }

  initAsset = (cid: string, requestHash: string) => {
    this.cid = cid;
    this.requestHash = requestHash;
  };
}
