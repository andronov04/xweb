import { IAssetMetadata, ITokenMetadata } from './metadata';

export interface IUser {
  id: string;
  username?: string;
  description?: string;
  avatar_uri?: string;
  metadata_uri?: string;
  metadata?: any; // TODO Description
  created?: string;
  updated?: string;
}

interface INestedAggregateCount {
  count: number;
}

interface INestedAggregate {
  aggregate: INestedAggregateCount;
}

export interface IAsset {
  id: number;
  name: string;
  description?: string;
  user?: IUser;
  slug?: string;
  kind?: number; // Enum
  digest?: string;
  hash?: string;
  state?: string;
  created?: string;
  metadata?: IAssetMetadata;
  assetTokenAssets_aggregate?: INestedAggregate;
}

export interface IToken {
  id: number;
  name: string;
  description?: string;
  user?: IUser;
  slug?: string;
  created?: string;
  updated?: string;
  price?: number;
  flag: number;
  buy_editions?: number;
  royalties?: number;
  editions?: number;
  metadataUri?: string;
  metadata?: ITokenMetadata;
  zhash?: string;
  enabled?: boolean;
  tags?: string[];
  __typename?: string;
  asset?: IAsset;
}

export interface IItem {
  id: number;
  name: string;
  description?: string;
  user?: IUser;
  slug?: string;
  created?: string;
  updated?: string;
  price?: number;
  width: number;
  tags?: string[];
  height: number;
  __typename?: string;
  royalties?: number;
  metadataUri?: string;
  metadata: ITokenMetadata | IAssetMetadata;
}

export interface IActiveArt {
  assets: any[];
  proxy: WindowProxy;
}
