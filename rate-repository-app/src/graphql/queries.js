import { gql } from '@apollo/client';
import { RepositoryFragments, PageInfoFragments } from './fragments';



export const GET_REPOSITORIES = gql`
query repositories(
  $after: String 
  $first: Int 
  $orderDirection: OrderDirection 
  $orderBy: AllRepositoriesOrderBy 
  $searchKeyword: String
  $ownerName: String
  ) { 
  repositories(
    after: $after 
    first: $first 
    orderDirection: $orderDirection 
    orderBy: $orderBy  
    searchKeyword: $searchKeyword
    ownerName: $ownerName
  )   
  {
    edges {
      node {
        ...allRepositoryData
      }
      cursor
    }

    pageInfo {
      ...allPageInfoData
    }

    
  }
}

  ${RepositoryFragments.allRepositoryData}
  ${PageInfoFragments.allPageInfoData}
`;