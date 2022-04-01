import { ContractAbstraction, MichelsonMap, OpKind, TezosToolkit, Wallet } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { RPC_LIST, TZ_ADDRESS_ASSET, TZ_ADDRESS_MARKETPLACE, TZ_ADDRESS_TOKEN, TZ_NETWORK } from '../constants';
import { NetworkType } from '@airgap/beacon-sdk/dist/cjs/types/beacon/NetworkType';
import { ContractCall, ContractRequestStatus, EContract, MintAssetCallData, MintTokenCallData, TradeTokenCallData } from '../types/contract';
import { MichelsonV1Expression } from '@taquito/rpc';

const addresses: Record<EContract, string> = {
  ASSET: TZ_ADDRESS_ASSET,
  TOKEN: TZ_ADDRESS_TOKEN,
  MARKETPLACE: TZ_ADDRESS_MARKETPLACE
};

class WalletApi {
  wallet: BeaconWallet;
  rpcl: string[] = [];
  tzToolkit: TezosToolkit;
  contracts: Record<EContract, ContractAbstraction<Wallet> | null> = {
    ASSET: null,
    TOKEN: null,
    MARKETPLACE: null
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

  async disconnect(): Promise<void> {
    await this.wallet.disconnect();
    this.tzToolkit.setWalletProvider(this.wallet);
    this.contracts = {
      ASSET: null,
      TOKEN: null,
      MARKETPLACE: null
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
    const opSend = await contract.methodsObject.mint(tzData).send();

    console.log('opSend', opSend);
    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);
    console.log('opSend.opHash:::', opSend.opHash);
    // await wait(opSend.opHash)

    // OK, injected
    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };
  mintToken: ContractCall<MintTokenCallData> = async (tzData, requestCallback) => {
    const contract = await this.getContract(EContract.TOKEN);

    requestCallback(ContractRequestStatus.CALLING);
    const opSend = await contract.methodsObject.mint(tzData).send();

    console.log('opSend', opSend);
    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    // OK, injected
    requestCallback(ContractRequestStatus.INJECTED, { hash: opSend.opHash });
  };

  // To trade token to marketplace
  tradeToken: ContractCall<TradeTokenCallData> = async (tzData, requestCallback) => {
    // the origination parameters
    const updateOperatorsValue: MichelsonV1Expression = [
      {
        prim: 'Left',
        args: [
          {
            prim: 'Pair',
            args: [
              {
                string: tzData.ownerId
              },
              {
                prim: 'Pair',
                args: [
                  {
                    string: addresses.MARKETPLACE
                  },
                  {
                    int: '' + tzData.tokenId
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    //price mutez
    // royalties map(address, nat)
    // royalty nat
    // token_id nat
    // user_id address
    const listItemValue: MichelsonV1Expression = {
      prim: 'Pair',
      args: [
        {
          prim: 'Pair',
          args: [
            {
              int: '1000'
            },
            [
              {
                // TODO Sort by key string (address)
                prim: 'Elt',
                args: [
                  {
                    string: 'tz1dVwCaa2bamxcQ3UxoLLeqKEs7s87Q55xm'
                  },
                  {
                    int: '5'
                  }
                ]
              },
              {
                prim: 'Elt',
                args: [
                  {
                    string: 'tz1iChpqVTi68JTcbpmmVnD9yfXxe2UxTkZL'
                  },
                  {
                    int: '1'
                  }
                ]
              }
            ]
          ]
        },
        {
          prim: 'Pair',
          args: [
            {
              int: '145'
            },
            {
              prim: 'Pair',
              args: [
                {
                  int: '0'
                },
                {
                  string: 'tz1iChpqVTi68JTcbpmmVnD9yfXxe2UxTkZL'
                }
              ]
            }
          ]
        }
      ]
    };

    // call the contract (open wallet)
    requestCallback(ContractRequestStatus.CALLING);
    // const opSend = await objktContract.methodsObject.update_operators().getSignature()
    const batchOp = await this.tzToolkit.wallet
      .batch()
      .with([
        {
          kind: OpKind.TRANSACTION,
          to: addresses.TOKEN,
          fee: 1000,
          amount: 0,
          parameter: {
            entrypoint: 'update_operators',
            value: updateOperatorsValue
          },
          gasLimit: 8000,
          storageLimit: 250
        },
        {
          kind: OpKind.TRANSACTION,
          to: addresses.MARKETPLACE,
          fee: 1500,
          amount: 0,
          parameter: {
            entrypoint: 'offer',
            value: listItemValue
          },
          gasLimit: 10000,
          storageLimit: 250
        }
      ])
      .send();

    // wait
    requestCallback(ContractRequestStatus.WAITING_CONFIRMATION);

    // OK, injected
    requestCallback(ContractRequestStatus.INJECTED, { hash: batchOp.opHash });
  };
}
let wallet;
export const getWallet = (): WalletApi => {
  if (!wallet) {
    wallet = new WalletApi();
  }
  return wallet;
};
