import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";


const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    try {
      const { data: mutationData } = await mutate({
        variables: {
          user: {
            username,
            password
          }
        }
      });
      const { createUser: data } = mutationData;
      
      return { data, success: true };
    } catch (e) {
      return { success: false };
    }
  };

  

  return {
    signUp,
    result
  };
};

export default useCreateUser;