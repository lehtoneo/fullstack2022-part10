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

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repository {
        id
      }
    }
  }
  
`;

export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
  
`;