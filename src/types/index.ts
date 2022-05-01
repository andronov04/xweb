import { IAssetMetadata, ITokenMetadata } from './metadata';

export enum IAssetFlag {
  NONE = 0,
  REVIEW = 1,
  BANNED = 2,
  HIDDEN = 3
}

export enum IUserRole {
  USER = 0,
  MODERATOR = 1,
  ADMIN = 2
}

export enum ITokenFlag {
  NONE = 0,
  REVIEW = 1,
  BANNED = 2
}

export enum IUserFlag {
  NONE = 0,
  REVIEW = 1,
  BANNED = 2,
  LIMIT = 3
}

export interface IUser {
  id: string;
  username?: string;
  temp?: boolean;
  verified?: boolean;
  description?: string;
  avatarUri?: string;
  role?: IUserRole;
  flag?: IUserFlag;
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

export interface IOffer {
  id: number;
  price: number;
}

export interface IAsset {
  id: number;
  name: string;
  description?: string;
  user?: IUser;
  slug?: string;
  tags?: string[];
  royalties?: number;
  metadataUri?: string;
  kind?: number; // Enum
  digest?: string;
  hash?: string;
  enabled?: boolean;
  flag?: IAssetFlag;
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
  owner?: IUser;
  offer?: IOffer;
  slug?: string;
  created?: string;
  updated?: string;
  price?: number;
  enabled?: boolean;
  flag?: ITokenFlag;
  buy_editions?: number;
  royalties?: number;
  editions?: number;
  metadataUri?: string;
  metadata?: ITokenMetadata;
  zhash?: string;
  tags?: string[];
  height?: number;
  width?: number;
  __typename?: string;
  asset?: IAsset;
}

export interface IItem {
  id: number;
  offerId?: number;
  name: string;
  description?: string;
  enabled?: boolean;
  user?: IUser;
  owner?: IUser;
  offer?: IOffer;
  slug?: string;
  created?: string;
  updated?: string;
  price?: number;
  width?: number;
  tags?: string[];
  height?: number;
  __typename?: string;
  royalties?: number;
  metadataUri?: string;
  assetTokenAssets_aggregate?: INestedAggregate;
  metadata: ITokenMetadata | IAssetMetadata;
}

export interface IActiveArt {
  assets: any[];
  proxy: WindowProxy;
}

export enum IActivityFlag {
  NONE = 0,
  REVIEW = 1,
  REPORTED = 2,
  HIDDEN = 3
}
