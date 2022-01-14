import React from 'react';
import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';

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
  signInButtonContainer: {
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    padding: 10,
    color: "white"
  }
});

const SignInButton = ({ onSubmit }) => {
  return (
    <Pressable onPress={onSubmit}>
      <View style={styles.signInButtonContainer}>
        <Text style={styles.signInText} fontWeight="bold">Sign in</Text>
      </View>
    </Pressable>
  );
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <FormikTextInput placeholder="Username" name="username" style={{ ...styles.input }}/>
        <FormikTextInput placeholder="Password" name="password" style={{ ...styles.input, marginTop: 10 }}/>
        <SignInButton onSubmit={onSubmit}/>
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


const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
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

export default SignIn;