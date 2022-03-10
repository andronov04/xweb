export class CreArt {
  assets: any = [];
  proxy: WindowProxy | null = null;

  constructor() {
    //
  }

  setProxy = (proxy: WindowProxy) => {
    this.proxy = proxy;
  };
}
