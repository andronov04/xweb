import { gql } from '@apollo/client';

export const SUB_ACTION_OP_HASH = gql`
  subscription actionOpHash($opHash: String!) {
    action(where: { opHash: { _eq: $opHash } }) {
      id
      kind
      asset {
        id
        slug
      }
      token {
        id
        slug
      }
      offer {
        id
      }
    }
  }
`;
