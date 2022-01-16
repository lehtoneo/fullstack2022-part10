import { gql } from '@apollo/client';

export const UserFragments = {
  allUserData: gql`
    fragment allUserData on User {
      id
      username
      createdAt
      reviews {
        totalCount
      }
      reviewCount
    }
  `
};

export const PageInfoFragments = {
  allPageInfoData: gql`
    fragment allPageInfoData on PageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  `,
};

export const RepositoryFragments = {
  allRepositoryData: gql`
    fragment allRepositoryData on Repository {
      id
      ownerName
      name
      createdAt
      fullName
      reviews {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      openIssuesCount
      url
      ownerAvatarUrl
      description
      language
      authorizedUserHasReviewed
    }
  `,
};

export const CombinedFragments = { ...RepositoryFragments, ...PageInfoFragments };