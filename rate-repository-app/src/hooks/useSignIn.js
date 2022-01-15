import { useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";


const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: {
            username,
            password
          }
        }
      });
      return { data: data.authorize };
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