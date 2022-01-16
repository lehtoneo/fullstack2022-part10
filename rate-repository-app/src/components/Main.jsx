import React, { useEffect } from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import RepositoryPage from './RepositoryPage';
import CreateReviewPage from './CreateReviewPage';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/repository/:id" exact>
          <RepositoryPage />
        </Route>
        <Route path="/create-review" exact>
          <CreateReviewPage/>
        </Route>
        <Route path="/sign-in" exact>
          <SignIn/>
        </Route>
        <Route path="/sign-up" exact>
          <SignUp/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;