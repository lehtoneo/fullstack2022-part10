import { useQuery } from '@apollo/client';
import { GET_AUTHORIZER_USER } from '../graphql/queries';

const useAuthorizedUser = () => {

  const { data, loading } = useQuery(GET_AUTHORIZER_USER, {
    fetchPolicy: 'network-only',
    onError: (e) => {
      console.log(e);
    }
  });

  return { 
    user: data ? data.authorizedUser : undefined,
    loading
  };
};

export default useAuthorizedUser;