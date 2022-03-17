import { ContractAbstraction, TezosToolkit, Wallet } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { RPC_LIST, TZ_ADDRESS_ASSET, TZ_NETWORK } from '../constants';
import { NetworkType } from '@airgap/beacon-sdk/dist/cjs/types/beacon/NetworkType';
import { ContractCall, ContractRequestStatus, EContract, MintAssetCallData } from '../types/contract';

const addresses: Record<EContract, string> = {
  ASSET: TZ_ADDRESS_ASSET
};

class WalletApi {
  wallet: BeaconWallet;
  rpcl: string[] = [];
  tzToolkit: TezosToolkit;
  contracts: Record<EContract, ContractAbstraction<Wallet> | null> = {
    ASSET: null
  };

  constructor() {
    this.rpcl = [...RPC_LIST.split(',')];
    this.tzToolkit = new TezosToolkit(this.rpcl[0]);
    // Init wallet
    this.wallet = new BeaconWallet({
      name: 'art3s',
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

  getContract = async (contract: EContract): Promise<ContractAbstraction<Wallet>> => {
    if (!this.contracts[contract]) {
      this.contracts[contract] = await this.tzToolkit.wallet.at(addresses[contract]);
    }
    return this.contracts[contract]!;
  };

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
  mintAsset: ContractCall<MintAssetCallData> = async (tzData, requestCallback) => {
    const contract = await this.getContract(EContract.ASSET);

    requestCallback(ContractRequestStatus.CALLING);
    const opSend = await contract.methodsObject.mint(tzData).send();

    console.log('opSend', opSend);
    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);
    // await isOperationApplied(opSend.opHash)

    // OK, injected
    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };
}
let wallet;
export const getWallet = (): WalletApi => {
  if (!wallet) {
    wallet = new WalletApi();
  }
  return wallet;
};
