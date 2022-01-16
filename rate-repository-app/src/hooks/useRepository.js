import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {

  const { data, refetch, loading} = useQuery(GET_REPOSITORY, {
    variables: {
      id
    },
    fetchPolicy: 'cache-and-network',
    onError: (e) => {
      console.log(e);
    }
  });

  return { 
    repository: data?.repository ? data.repository : undefined, 
    loading, 
    refetch 
  };
};

export default useRepository;