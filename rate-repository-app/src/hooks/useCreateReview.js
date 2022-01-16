import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";


const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (review) => {
    try {
      console.log({ review });
      const { data } = await mutate({
        variables: {
          review: {
            ...review,
            rating: Number(review.rating)
          }
        }
      });
      return { success: true, newReview: data.createReview };
    } catch (e) {
      
      return { success: false };
    }
  };

  

  return {
    createReview,
    result
  };
};

export default useCreateReview;