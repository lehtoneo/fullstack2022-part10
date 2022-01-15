

import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";
import useAuthStorage from './useAuthStorage';


const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    try {
      const { data: mutationData } = await mutate({
        variables: {
          credentials: {
            username,
            password
          }
        }
      });
      const { authorize: data } = mutationData;
      await authStorage.setAccessToken(data.accessToken);
      await apolloClient.resetStore();
      return { data, success: true };
    } catch (e) {
      return { success: false };
    }
  };

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      return { success: true };
    } catch (e) {
      
      return { success: false };
    }
  };

  return {
    signIn,
    signOut,
    result
  };
};

export default useSignIn;