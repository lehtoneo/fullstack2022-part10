import React from 'react';
import { ActivityIndicator, View, Linking } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';

import RepositoryItem from './RepositoryItem';




const RepositoryPage = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  const handleOpenInGithubPress = (url) => {
    Linking.openURL(url);
  };
  
  if (!repository) {
    return <ActivityIndicator/>;
  }

  return (
    <View style={{ flex: 1 }}>
      <RepositoryItem repository={repository} onOpenInGithubPress={handleOpenInGithubPress}/>
    </View>
  );
};

export default RepositoryPage;