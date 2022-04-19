import type { MichelsonMap } from '@taquito/taquito';
import BigNumber from 'bignumber.js';

export enum ContractRequestStatus {
  NONE = 'NONE',
  CALLING = 'CALLING',
  WAITING_CONFIRMATION = 'WAITING_CONFIRMATION',
  INJECTED = 'INJECTED',
  ERROR = 'ERROR'
}

export type ContractRequestCallback = (status: ContractRequestStatus, data?: any) => any;

export type ContractCall<T> = (data: T, requestCallback: ContractRequestCallback) => any;

export type ContractUseCallState<T> = {
  status: ContractRequestStatus;
  loading: boolean;
  result: string | null;
};

export enum EContract {
  ASSET = 'ASSET',
  TOKEN = 'TOKEN',
  MARKETPLACE = 'MARKETPLACE'
}

export type ContractUseCallReturn<T> = {
  state: ContractUseCallState<T>;
  call: (data: T) => void;
};

export interface MintAssetCallData {
  enabled: boolean;
  metadata: string;
  price: number;
  royalties: number;
}

export interface MintStatusCallData {
  token_id: number;
  status: number;
}

export interface CollectCallData {
  price: number;
  id: number;
}

export interface TradeTokenCallData {
  price: number;
  ownerId: string; // owner current
  tokenId: number;
  userId: string; // creator
}

export interface MintTokenCallData {
  assets: MichelsonMap<number, BigNumber>; // TODO data order -id
  royalties: number;
  digest: string;
  metadata: string;
}
