import React from 'react';
import { View, StyleSheet } from "react-native";

import { useHistory } from "react-router-native";

import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';

import useSignIn from '../hooks/useSignIn';
import Button from './Button';

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



const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <FormikTextInput placeholder="Username" name="username" style={{ ...styles.input }}/>
        <FormikTextInput placeholder="Password" name="password" style={{ ...styles.input, marginTop: 10 }} secureTextEntry={true}/>
        <Button onPress={onSubmit} title="Sign in"/>
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});


export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: ""
  };
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

const SignIn = () => {
  const { signIn } = useSignIn();
  const history = useHistory();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data, success } = await signIn({ username, password });
      console.log(data);
      if (success) {
       history.push('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit}/>
  );
};

export default SignIn;