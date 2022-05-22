export const QL_TZ_PROFILE_USER = `
  query MyQuery($id: String!) {
    tzprofiles_by_pk(account: $id) {
      valid_claims
    }
  }
`;
