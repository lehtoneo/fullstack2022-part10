import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

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

export const ItemSeparator = () => <View style={styles.separator} />;

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
  const [ sortString, setSortString ] = useState("latest");
  const [ sort, setSort ] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "ASC"
  });
  useEffect(() => {
    if (sortString === "latest") {
      setSort({
        orderBy: "CREATED_AT",
        orderDirection: "DESC"
      });
    }
    if (sortString === "highestRating") {
      setSort({
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC"
      });
    }
    if (sortString === "lowestRating") {
      setSort({
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC"
      });
    }
  },[sortString]);
  const { repositories } = useRepositories(sort);
  const history = useHistory();
  const handleRepositoryPress = (id) => {
    history.push(`/repository/${id}`);
  };
  return (
    <View style={{ flex: 1}}>
      <Picker
        selectedValue={sortString}
        onValueChange={(itemValue) =>
          setSortString(itemValue)
        }>
        <Picker.Item label="Latest repositories" value="latest"
        />
        <Picker.Item label="Highest rated repositories" value="highestRating" />
        <Picker.Item label="Lowest rated repositories" value="lowestRating" />
      </Picker>
      <RepositoryListContainer repositories={repositories} onRepositoryPress={handleRepositoryPress}/>
    </View>
  );
};

export default RepositoryList;