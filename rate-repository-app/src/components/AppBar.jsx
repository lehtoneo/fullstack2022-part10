import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from "react-router-native";

const SPACING = 20;
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: "#24292e"
    // ...
  },
  headerContainer: {
    marginLeft: SPACING,
    marginBottom: SPACING,
    marginRight: SPACING,
    flexDirection: "row"
  },
  headerText: {
    color: "white",
  }
  // ...
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <View style={styles.headerContainer}>
        <Link to="/">
          <Text fontSize="subheading" fontWeight="bold" style={styles.headerText}>Repositories</Text>
        </Link>
        <Link to="/sign-in" style={ { marginLeft: SPACING }}>
          <Text fontSize="subheading" fontWeight="bold" style={styles.headerText}>Sign in</Text>
        </Link>
      </View>
    </ScrollView>
    
  </View>
  );
};

export default AppBar;