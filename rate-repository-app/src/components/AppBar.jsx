import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from "react-router-native";
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useSignIn from '../hooks/useSignIn';

const SPACING = 20;
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: "#24292e"
    // ...
  },
  headerContainer: {
    marginLeft: 0,
    marginBottom: SPACING,
    marginRight: SPACING,
    flexDirection: "row"
  },
  headerText: {
    color: "white",
    marginLeft: SPACING 
  }
  // ...
});

const SignOutButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text fontSize="subheading" fontWeight="bold" style={styles.headerText}>Sign Out</Text>
    </Pressable>

  );
};

const AppBar = () => {
  const { user } = useAuthorizedUser();
  const { signOut } = useSignIn();

  const handleSignOutPress = async () => {
    await signOut();
  };
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <View style={styles.headerContainer}>
        <Link to="/">
          <Text fontSize="subheading" fontWeight="bold" style={styles.headerText}>Repositories</Text>
        </Link>
        {
          user !== null && 
          <Link to="/create-review">
            <Text fontSize="subheading" fontWeight="bold" style={{...styles.headerText  }}>Create a review</Text>
          </Link>
        }

        { user !== null &&
          <Link to="/user-reviews">
            <Text fontSize="subheading" fontWeight="bold" style={{...styles.headerText  }}>My reviews</Text>
          </Link>
        }
        

        { user !== null &&
          <SignOutButton onPress={handleSignOutPress}/>
        }

        { user === null && 
          <Link to="/sign-in">
            <Text fontSize="subheading" fontWeight="bold" style={styles.headerText}>Sign in</Text>
          </Link>
        }

        { user === null && 
          <Link to="/sign-up">
            <Text fontSize="subheading" fontWeight="bold" style={styles.headerText}>Sign up</Text>
          </Link>
        }
        
      </View>
    </ScrollView>
    
  </View>
  );
};

export default AppBar;