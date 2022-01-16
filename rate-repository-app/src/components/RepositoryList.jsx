import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  statsItemContainer: {
    flex: 6/4,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  }

  
});

const ItemSeparator = () => <View style={styles.separator} />;

const RenderRepository = ({ item: repository, onPress }) => {
  
  return (
    <Pressable onPress={onPress ? () => onPress(repository.id) : undefined}>
      <RepositoryItem repository={repository}/>
    </Pressable>
  );
};

export const RepositoryListContainer = ( { repositories, onRepositoryPress }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RenderRepository item={item} onPress={onRepositoryPress}/>}
      // other props
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const history = useHistory();
  const handleRepositoryPress = (id) => {
    history.push(`/repository/${id}`);
  };
  return (
    <RepositoryListContainer repositories={repositories} onRepositoryPress={handleRepositoryPress}/>
  );
};

export default RepositoryList;