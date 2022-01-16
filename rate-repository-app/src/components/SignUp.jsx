import React from 'react';
import { View, StyleSheet } from "react-native";

import { useHistory } from "react-router-native";

import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';

import useSignIn from '../hooks/useSignIn';
import Button from './Button';
import useCreateUser from '../hooks/useCreateUser';

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



const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <FormikTextInput placeholder="Username" name="username" style={{ ...styles.input }}/>
        <FormikTextInput placeholder="Password" name="password" style={{ ...styles.input, marginTop: 10 }} secureTextEntry={true}/>
        <FormikTextInput placeholder="Confirm password" name="confirmPassword" style={{ ...styles.input, marginTop: 10 }} secureTextEntry={true}/>
        <Button onPress={onSubmit} title="Sign up"/>
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Min length is 1")
    .max(30, "Max length is 30")
    .required('Username is required'),
  password: yup
    .string()
    .min(5, "Min length is 5")
    .max(50, "Max length is 50")
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
     .required('Password confirmation is required')
});


export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
    confirmPassword: ""
  };
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

const SignUp = () => {
  const { signUp } = useCreateUser();
  const history = useHistory();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data, success } = await signUp({ username, password });
      console.log(data);
      if (success) {
       history.push('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit}/>
  );
};

export default SignUp;