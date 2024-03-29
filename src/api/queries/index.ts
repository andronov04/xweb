import { gql } from '@apollo/client';

export const QL_GET_USER = gql`
  query Query($username: String) {
    user(where: { username: { _eq: $username } }) {
      id
      username
      description
      role
      flag
      avatarUri
      verified
      metadataUri
      metadata
      created
      updated
    }
  }
`;

export const QL_GET_USER_BY_ID = gql`
  query Query($id: String) {
    user(where: { id: { _eq: $id } }) {
      id
      username
      description
      role
      verified
      flag
      avatarUri
      metadataUri
      metadata
      created
      updated
    }
  }
`;

export const QL_GET_SCRIPTS = gql`
  query MyQuery($limit: Int, $offset: Int) {
    scripts(order_by: { created: asc }, limit: $limit, offset: $offset) {
      name
      id
      description
      min_price
      flag
      enabled
      metadata
      royalties
      slug
      zhash
      created
      user {
        id
        verified
        username
      }
      date_publish
    }
  }
`;

export const QL_GET_TOKENS_BY_USER = gql`
  query MyQuery($userId: String!, $limit: Int, $offset: Int) {
    token(where: { userId: { _eq: $userId } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      created
      description
      id
      digest
      metadata
      slug
      width
      height
      name
      flag
      owner {
        id
        verified
        username
        avatarUri
      }
      offer {
        id
        price
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_CREATED_BY_USER = gql`
  query MyQuery($userId: String!, $limit: Int, $offset: Int) {
    token(where: { userId: { _eq: $userId } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      created
      description
      id
      digest
      metadata
      slug
      width
      height
      name
      flag
      offer {
        id
        price
      }
      owner {
        id
        verified
        username
        avatarUri
      }
      user {
        id
        verified
        username
      }
    }
    asset(where: { userId: { _eq: $userId } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      name
      id
      description
      flag
      enabled
      metadata
      royalties
      slug
      created
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

// enabled
export const QL_GET_CREATED_WITH_BY_USER = gql`
  query MyQuery($userId: String!, $enabled: Boolean, $limit: Int, $offset: Int) {
    token(where: { userId: { _eq: $userId }, enabled: { _eq: $enabled } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      created
      description
      id
      digest
      metadata
      slug
      width
      height
      name
      flag
      offer {
        id
        price
      }
      owner {
        id
        verified
        username
        avatarUri
      }
      user {
        id
        verified
        username
      }
    }
    asset(where: { userId: { _eq: $userId }, enabled: { _eq: $enabled } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      name
      id
      description
      flag
      enabled
      metadata
      royalties
      slug
      created
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_ASSETS_BY_USER = gql`
  query MyQuery($userId: String!, $limit: Int, $offset: Int) {
    asset(where: { userId: { _eq: $userId } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      name
      id
      description
      flag
      enabled
      metadata
      royalties
      slug
      created
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_ASSET_ITEMS = gql`
  query MyQuery($flag: smallint, $enabled: Boolean, $limit: Int, $offset: Int) {
    asset(where: { flag: { _eq: $flag }, enabled: { _eq: $enabled } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      name
      id
      description
      flag
      enabled
      metadata
      royalties
      slug
      created
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_ASSET_ITEMS_BY_IDS = gql`
  query MyQuery($ids: [bigint], $limit: Int, $offset: Int) {
    asset(order_by: { created: desc }, limit: $limit, offset: $offset, where: { id: { _in: $ids }, _and: { enabled: { _eq: true } } }) {
      name
      id
      description
      flag
      enabled
      metadata
      royalties
      slug
      created
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_ASSET_ITEMS_BY_NOT_IDS = gql`
  query MyQuery($ids: [bigint], $limit: Int, $offset: Int) {
    asset(order_by: { created: desc }, limit: $limit, offset: $offset, where: { id: { _nin: $ids } }) {
      name
      id
      description
      flag
      enabled
      metadata
      royalties
      slug
      created
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_ASSET_ITEMS_BY_NOT_IDS_AND_FLAG = gql`
  query MyQuery($ids: [bigint], $flag: smallint, $limit: Int, $offset: Int) {
    asset(order_by: { created: desc }, limit: $limit, offset: $offset, where: { id: { _nin: $ids }, _and: { flag: { _eq: $flag }, enabled: { _eq: true } } }) {
      name
      id
      description
      flag
      enabled
      metadata
      royalties
      slug
      created
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_ASSET_ITEMS_BY_TOKEN = gql`
  query MyQuery($tokenId: bigint!, $limit: Int, $offset: Int) {
    asset(where: { assetTokenAssets: { tokenId: { _eq: $tokenId } } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      name
      id
      description
      flag
      enabled
      metadata
      royalties
      slug
      created
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_TOKEN_ITEMS_BY_ASSET = gql`
  query MyQuery($assetId: bigint!, $limit: Int, $offset: Int) {
    token(where: { tokenAssets: { assetId: { _eq: $assetId } } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      created
      description
      id
      digest
      metadata
      slug
      width
      height
      name
      flag
      owner {
        id
        verified
        username
        avatarUri
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_TOKEN_ITEMS = gql`
  query MyQuery($flag: smallint, $enabled: Boolean, $limit: Int, $offset: Int) {
    token(where: { flag: { _eq: $flag }, enabled: { _eq: $enabled } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      created
      description
      id
      digest
      metadata
      metadataUri
      slug
      width
      height
      name
      flag
      owner {
        id
        verified
        username
        avatarUri
      }
      user {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_OFFER_TOKENS = gql`
  query Query($flag: smallint, $enabled: Boolean, $limit: Int, $offset: Int) {
    offer(where: { token: { flag: { _eq: $flag }, enabled: { _eq: $enabled } } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      id
      token {
        id
        slug
        name
        metadata
        user {
          id
          verified
          username
          avatarUri
        }
        owner {
          id
          verified
          username
          avatarUri
        }
        royalties
      }
      price
    }
  }
`;

export const QL_GET_TOKEN = gql`
  query Query($slug: String) {
    token(where: { slug: { _eq: $slug } }) {
      created
      description
      id
      metadata
      slug
      metadataUri
      tags
      width
      height
      enabled
      royalties
      name
      flag
      offer {
        id
        price
      }
      user {
        id
        verified
        username
        avatarUri
      }
      owner {
        id
        verified
        username
        avatarUri
      }
    }
  }
`;

export const QL_GET_TOKEN_BY_ID = gql`
  query Query($id: bigint) {
    token(where: { id: { _eq: $id } }) {
      created
      description
      id
      metadata
      slug
      metadataUri
      tags
      width
      height
      enabled
      royalties
      name
      flag
      offer {
        id
        price
      }
      user {
        id
        verified
        username
        avatarUri
      }
      owner {
        id
        verified
        username
        avatarUri
      }
    }
  }
`;

export const QL_GET_COUNT_TOKENS = gql`
  query MyQuery {
    tokenAggregate {
      aggregate {
        count
      }
    }
  }
`;

export const QL_GET_TOKEN_RANDOM_BY_ID = gql`
  query Query($limit: Int, $offset: Int) {
    token(where: { _and: { flag: { _eq: 0 }, enabled: { _eq: true } } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      created
      description
      id
      metadata
      slug
      metadataUri
      tags
      width
      height
      name
      flag
      owner {
        id
        verified
        username
        avatarUri
      }
      offer {
        id
        price
      }
      user {
        id
        verified
        username
        avatarUri
      }
    }
  }
`;

export const QL_GET_ASSET_BY_ID = gql`
  query Query($id: bigint) {
    asset(where: { id: { _eq: $id } }) {
      id
      user {
        id
        verified
        username
        avatarUri
      }
      enabled
      flag
      metadata
      metadataUri
      slug
      name
      description
      tags
      royalties
      enabled
      created
      updated
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const QL_GET_ASSET = gql`
  query Query($slug: String) {
    asset(where: { slug: { _eq: $slug } }) {
      id
      user {
        id
        verified
        username
        avatarUri
      }
      enabled
      flag
      metadata
      metadataUri
      slug
      name
      description
      tags
      royalties
      enabled
      created
      updated
      width
      height
      assetTokenAssets_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const QL_GET_TOKEN_ITEMS_BY_SCRIPT = gql`
  query MyQuery($script_id: bigint!, $limit: Int, $offset: Int) {
    tokens(where: { script_id: { _eq: $script_id } }, order_by: { created: asc }, limit: $limit, offset: $offset) {
      created
      is_sale
      description
      id
      metadata
      slug
      price
      name
      flag
      user {
        id
        verified
        username
      }
    }
  }
`;

//  { _or: [{ ownerId: { _eq: $ownerId } }, { userId: { _eq: $ownerId } }] }
//
export const QL_GET_TOKEN_OWNED_ITEMS_BY_USER = gql`
  query MyQuery($ownerId: String, $limit: Int, $offset: Int) {
    token(where: { ownerId: { _eq: $ownerId }, userId: { _neq: $ownerId } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      created
      description
      id
      digest
      metadata
      slug
      width
      height
      name
      flag
      offer {
        id
        price
      }
      user {
        id
        verified
        username
      }
      owner {
        id
        verified
        username
      }
    }
  }
`;

export const QL_GET_TOKEN_SALES_ITEMS_BY_USER = gql`
  query MyQuery($userId: String, $limit: Int, $offset: Int) {
    offer(where: { token: { userId: { _eq: $userId } } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      id
      token {
        id
        slug
        name
        metadata
        user {
          id
          verified
          username
          avatarUri
        }
        owner {
          id
          verified
          username
          avatarUri
        }
        royalties
      }
      price
    }
  }
`;

export const QL_GET_ACTION_BY_USER = gql`
  query MyQuery($userId: String!, $limit: Int, $offset: Int) {
    action(where: { _or: [{ issuerId: { _eq: $userId } }, { targetId: { _eq: $userId } }] }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      id
      kind
      opHash
      issuer {
        id
        username
      }
      data
      target {
        id
        username
      }
      asset {
        id
        name
        slug
      }
      token {
        id
        name
        slug
      }
      offer {
        id
        price
        token {
          id
          name
          slug
        }
      }
      created
    }
  }
`;

export const QL_GET_ACTION_BY_TOKEN = gql`
  query MyQuery($tokenId: bigint!, $limit: Int, $offset: Int) {
    action(where: { tokenId: { _eq: $tokenId } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      id
      opHash
      issuer {
        id
        username
      }
      data
      target {
        id
        username
      }
      asset {
        id
        name
        slug
      }
      token {
        id
        name
        slug
      }
      kind
      offer {
        id
        price
        token {
          id
          name
          slug
        }
      }
      created
    }
  }
`;

export const QL_GET_ACTION_BY_ASSET = gql`
  query MyQuery($assetId: bigint!, $limit: Int, $offset: Int) {
    action(where: { assetId: { _eq: $assetId } }, order_by: { created: desc }, limit: $limit, offset: $offset) {
      id
      kind
      opHash
      data
      issuer {
        id
        username
      }
      target {
        id
        username
      }
      asset {
        id
        name
        slug
      }
      token {
        id
        name
        slug
      }
      offer {
        id
        price
        token {
          id
          name
          slug
        }
      }
      created
    }
  }
`;
