import { ContractAbstraction, TezosToolkit, Wallet } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { MINI_LOGO_URL, RPC_LIST, TZ_ADDRESS_ASSET, TZ_ADDRESS_MARKETPLACE, TZ_ADDRESS_PROFILE, TZ_ADDRESS_TOKEN, TZ_NETWORK } from '../constants';
import {
  CollectCallData,
  ContractCall,
  ContractRequestStatus,
  EContract,
  MintAssetCallData,
  MintStatusCallData,
  MintTokenCallData,
  MintUpdProfileCallData,
  TradeTokenCallData,
  UpdateAssetCallData,
  UpdateTokenCallData
} from '../types/contract';
import { MichelsonV1Expression } from '@taquito/rpc';
import { ColorMode, NetworkType } from '@airgap/beacon-sdk';

const addresses: Record<EContract, string> = {
  ASSET: TZ_ADDRESS_ASSET,
  TOKEN: TZ_ADDRESS_TOKEN,
  MARKETPLACE: TZ_ADDRESS_MARKETPLACE,
  PROFILE: TZ_ADDRESS_PROFILE
};

class WalletApi {
  wallet: BeaconWallet;
  rpcl: string[] = [];
  tzToolkit: TezosToolkit;
  contracts: Record<EContract, ContractAbstraction<Wallet> | null> = {
    ASSET: null,
    TOKEN: null,
    MARKETPLACE: null,
    PROFILE: null
  };

  constructor() {
    this.rpcl = [...RPC_LIST.split(',')];
    this.tzToolkit = new TezosToolkit(this.rpcl[0]);
    // Init wallet
    this.wallet = new BeaconWallet({
      name: 'Contter',
      appUrl: 'https://contter.com',
      iconUrl: MINI_LOGO_URL,
      colorMode: ColorMode.DARK,
      preferredNetwork: TZ_NETWORK as NetworkType
    });
  }

  async disconnect(): Promise<void> {
    await this.wallet.disconnect();
    this.tzToolkit.setWalletProvider(this.wallet);
    this.contracts = {
      ASSET: null,
      TOKEN: null,
      MARKETPLACE: null,
      PROFILE: null
    };
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
    const opSend = await contract.methodsObject.mint_asset(tzData).send();

    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };

  mintToken: ContractCall<MintTokenCallData> = async (tzData, requestCallback) => {
    const contract = await this.getContract(EContract.TOKEN);

    requestCallback(ContractRequestStatus.CALLING);
    const opSend = await contract.methodsObject.mint(tzData).send();

    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };

  // To cancel token to marketplace
  cancelOffer: ContractCall<number> = async (offerId, requestCallback) => {
    const contract = await this.getContract(EContract.MARKETPLACE);

    requestCallback(ContractRequestStatus.CALLING);
    const opSend = await contract.methodsObject.cancel_offer(offerId).send();

    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };

  // To trade token to marketplace
  tradeToken: ContractCall<TradeTokenCallData> = async (tzData, requestCallback) => {
    const contract = await this.getContract(EContract.MARKETPLACE);
    const opSend = await contract.methodsObject
      .offer({
        price: tzData.price,
        token_id: tzData.tokenId
      })
      .send();

    // wait
    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };

  statusAsset: ContractCall<MintStatusCallData> = async (tzData, requestCallback) => {
    const contract = await this.getContract(EContract.ASSET);

    requestCallback(ContractRequestStatus.CALLING);
    const opSend = await contract.methodsObject.status_asset(tzData).send();

    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };

  collect: ContractCall<CollectCallData> = async (tzData, requestCallback) => {
    const contract = await this.getContract(EContract.MARKETPLACE);

    requestCallback(ContractRequestStatus.CALLING);
    const opSend = await contract.methodsObject.collect(tzData.id).send({
      mutez: true,
      amount: tzData.price,
      gasLimit: 50000,
      storageLimit: 1000
    });

    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };

  updateAsset: ContractCall<UpdateAssetCallData> = async (tzData, requestCallback) => {
    const contract = await this.getContract(EContract.ASSET);

    requestCallback(ContractRequestStatus.CALLING);
    const opSend = await contract.methodsObject.update_asset(tzData).send();

    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };

  updateToken: ContractCall<UpdateTokenCallData> = async (tzData, requestCallback) => {
    const contract = await this.getContract(EContract.TOKEN);

    requestCallback(ContractRequestStatus.CALLING);
    const opSend = await contract.methodsObject.update_token(tzData).send();

    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };

  updateProfile: ContractCall<MintUpdProfileCallData> = async (tzData, requestCallback) => {
    const contract = await this.getContract(EContract.PROFILE);

    requestCallback(ContractRequestStatus.CALLING);
    const opSend = await contract.methodsObject.update(tzData).send();

    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

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
