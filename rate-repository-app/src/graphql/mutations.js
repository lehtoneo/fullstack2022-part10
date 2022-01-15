import { gql } from '@apollo/client';
import { UserFragments } from './fragments';
export const AUTHORIZE = gql`
  mutation authorize($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
      expiresAt
      user {
        ...allUserData
      }
    }
  }
  ${UserFragments.allUserData}
`;