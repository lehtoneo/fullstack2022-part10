import { gql } from '@apollo/client';

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