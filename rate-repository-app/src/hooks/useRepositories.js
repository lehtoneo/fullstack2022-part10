import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {

  const { data, refetch, loading} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    onError: (e) => {
      console.log(e);
    }
  });

  return { 
    repositories: data?.repositories ? data.repositories : undefined, 
    loading, 
    refetch 
  };
};

export default useRepositories;