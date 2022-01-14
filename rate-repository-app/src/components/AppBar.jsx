import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: "#24292e"
    // ...
  },
  header: {
    color: "white",
    marginLeft: 20,
    marginBottom: 20
  }
  // ...
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <Text fontSize="subheading" fontWeight="bold" style={styles.header}>Repositories</Text>
  </View>
  );
};

export default AppBar;