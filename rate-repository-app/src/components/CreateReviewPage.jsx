import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";

import { useHistory } from "react-router-native";

import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

import Button from './Button';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  formContainer: {
    margin: 20,
  },
  input: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.colors.textSecondary,
    padding: 10,
  },
});



const ReviewForm = ({ onSubmit, error }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <FormikTextInput placeholder="Repo owner name" name="ownerName" style={{ ...styles.input }}/>
        <FormikTextInput placeholder="Repo name" name="repositoryName" style={{ ...styles.input, marginTop: 10 }} />
        <FormikTextInput placeholder="Rating between 0 and 100" name="rating" style={{ ...styles.input, marginTop: 10 }} />
        <FormikTextInput placeholder="Review" name="text" style={{ ...styles.input, marginTop: 10 }} />
        
        <Button onPress={onSubmit} title="Create a review"/>
        { error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Username is required'),
  ownerName: yup
    .string()
    .required('Ownername is required'),
  rating: yup
    .number()
    .min(0, "Must be atleast 0 ")
    .max(100, "At most 100")
    .required('Rating is required'),
   text: yup
    .string(),
});


export const ReviewFormContainer = ({ onSubmit, error }) => {
  const initialValues = {
    repositoryName: "",
    ownerName: "",
    text: "",
    rating: ""
  };
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} error={error}/>}
    </Formik>
  );
};

const CreateReviewPage = () => {
  const { createReview } = useCreateReview();
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const onSubmit = async (values) => {

    try {
      const { success, newReview } = await createReview(values);

      if (success) {
        const repoId = newReview.repository.id;
        history.push(`/repository/${repoId}`);
      } else {
        setError('Error creating the review');
      }
    } catch (e) {
      setError('Error creating the review');
      console.log(e);
    }
  };

  return (
    <ReviewFormContainer onSubmit={onSubmit} error={error}/>
  );
};

export default CreateReviewPage;