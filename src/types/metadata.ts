export interface IMetaFormat {
  uri: string;
  hash: string;
  mimeType: string;
  dimensions?: any;
}

export interface IAssetMetadata {
  name: string;
  description: string;
  tags: string[];
  artifactUri: string;
  displayUri: string;
  thumbnailUri: string;
  symbol: string;
  decimals: number;
  version: string;
  type: string;
  date: string;
  isTransferable: boolean;
  formats: IMetaFormat[];
}

export interface ITokenMetadata {
  name: string;
  description: string;
  tags: string[];
  artifactUri: string;
  displayUri: string;
  thumbnailUri: string;
  symbol: string;
  stateUri?: string;
  decimals: number;
  version: string;
  type: string;
  date: string;
  isTransferable: boolean;
  formats?: IMetaFormat[];
}

export interface IProfileMetadata {
  username: string;
  description: string;
  avatarUri: string;
}
