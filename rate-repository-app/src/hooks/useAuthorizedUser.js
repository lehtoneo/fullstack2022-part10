import { useQuery } from '@apollo/client';
import { GET_AUTHORIZER_USER } from '../graphql/queries';

const useAuthorizedUser = (includeReviews) => {

  const { data, loading } = useQuery(GET_AUTHORIZER_USER, {
    fetchPolicy: 'network-only',
    variables: {
      includeReviews: includeReviews ? true : false
    },
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