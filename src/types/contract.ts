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

export interface TradeTokenCallData {
  price: number;
  ownerId: string; // owner current
  tokenId: number;
  userId: string; // creator
}

export interface MintTokenCallData {
  assets: number[]; // TODO data order -id
  enabled: boolean;
  digest: string;
  metadata: string;
}
