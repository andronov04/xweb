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
  ASSET = 'ASSET'
}

export type ContractUseCallReturn<T> = {
  state: ContractUseCallState<T>;
  call: (data: T) => void;
};

export interface MintAssetCallData {
  enabled: boolean;
  metadata: string;
  min_price: number;
  royalties: number;
}
