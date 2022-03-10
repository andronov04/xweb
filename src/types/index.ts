export interface IWalletUser {
  id: string;
  username?: string;
}

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

export interface IScript {
  id: string;
  name: string;
  description?: string;
  user?: IUser;
  slug?: string;
  created?: string;
  metadata?: any; // TODO Description
  count_tokens?: number;
}

export interface IArt {
  id: string;
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
  metadata_uri?: string;
  metadata?: any; // TODO Description
  zhash?: string;
  enabled?: boolean;
  tags?: string[];
  __typename?: string;
  script?: IScript;
}

export interface IItem extends IArt, IScript {
  id: string;
}

export interface IActiveArt {
  assets: any[];
  proxy: WindowProxy;
}
