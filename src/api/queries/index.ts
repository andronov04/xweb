import { gql } from '@apollo/client';

export const QL_GET_USER = gql`
  query Query($username: String) {
    users(where: { username: { _eq: $username } }) {
      id
      username
      description
      avatar_uri
      metadata_uri
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
        username
      }
      date_publish
    }
  }
`;

export const QL_GET_TOKENS_BY_USER = gql`
  query MyQuery($user_id: String!, $limit: Int, $offset: Int) {
    tokens(where: { user_id: { _eq: $user_id } }, order_by: { created: asc }, limit: $limit, offset: $offset) {
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
        username
      }
    }
  }
`;

export const QL_GET_SCRIPS_BY_USER = gql`
  query MyQuery($user_id: String!, $limit: Int, $offset: Int) {
    scripts(where: { user_id: { _eq: $user_id } }, order_by: { created: asc }, limit: $limit, offset: $offset) {
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
        username
      }
      date_publish
    }
  }
`;

export const QL_GET_ASSET_ITEMS = gql`
  query MyQuery($limit: Int, $offset: Int) {
    asset(order_by: { created: asc }, limit: $limit, offset: $offset) {
      name
      id
      description
      kind
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
        username
      }
      datePublish
    }
  }
`;

export const QL_GET_TOKEN_ITEMS = gql`
  query MyQuery($limit: Int, $offset: Int) {
    token(order_by: { created: desc }, limit: $limit, offset: $offset) {
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
      user {
        id
        username
      }
    }
  }
`;

export const QL_GET_OFFER_TOKENS = gql`
  query Query($limit: Int, $offset: Int) {
    offer(order_by: { created: desc }, limit: $limit, offset: $offset) {
      id
      token {
        id
        slug
        name
        metadata
        user {
          id
          username
          avatarUri
        }
        owner {
          id
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
      name
      flag
      offer {
        id
        price
      }
      user {
        id
        username
        avatarUri
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
        username
        avatarUri
      }
      enabled
      flag
      metadata
      metadataUri
      slug
      kind
      name
      description
      tags
      royalties
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
        username
      }
    }
  }
`;
export const QL_GET_TOKEN_OWNED_ITEMS_BY_USER = gql`
  query MyQuery($owner_id: String, $limit: Int, $offset: Int) {
    tokens(
      where: { owner_id: { _eq: $owner_id }, user_id: { _neq: $owner_id }, is_sale: { _eq: false } }
      order_by: { created: asc }
      limit: $limit
      offset: $offset
    ) {
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
        username
      }
      owner {
        id
        username
      }
    }
  }
`;

export const QL_GET_TOKEN_SALES_ITEMS_BY_USER = gql`
  query MyQuery($user_id: String, $limit: Int, $offset: Int) {
    tokens(
      where: { _or: [{ owner_id: { _eq: $user_id } }, { user_id: { _eq: $user_id } }], is_sale: { _eq: true } }
      order_by: { created: asc }
      limit: $limit
      offset: $offset
    ) {
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
        username
      }
      owner {
        id
        username
      }
    }
  }
`;
