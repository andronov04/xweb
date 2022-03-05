import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { RPC_LIST, TZ_NETWORK } from '../constants';
import { NetworkType } from '@airgap/beacon-sdk/dist/cjs/types/beacon/NetworkType';

export class WalletApi {
  wallet: BeaconWallet;
  rpcl: string[] = [];
  tzToolkit: TezosToolkit;

  constructor() {
    this.rpcl = [...RPC_LIST.split(',')];
    this.tzToolkit = new TezosToolkit(this.rpcl[0]);
    // Init wallet
    this.wallet = new BeaconWallet({
      name: 'xweb',
      preferredNetwork: TZ_NETWORK as NetworkType
    });
  }

  async connect(): Promise<string | false> {
    try {
      await this.wallet.requestPermissions({
        network: {
          type: TZ_NETWORK as NetworkType
        }
      });

      const tzId = await this.wallet.getPKH();
      this.tzToolkit.setWalletProvider(this.wallet);

      return tzId;
    } catch (err) {
      return false;
    }
  }

  async connectLocalStorage(): Promise<string | false> {
    try {
      const tzId = await this.wallet.getPKH();
      if (tzId) {
        this.tzToolkit.setWalletProvider(this.wallet);
        return tzId;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}
