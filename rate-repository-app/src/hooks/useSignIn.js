import { useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";
import authStorage from "../utils/authStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

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
      
      return { data };
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  return {
    signIn,
    result
  };
};

export default useSignIn;