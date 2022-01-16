import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { FlatList, View, StyleSheet, Pressable, ScrollView, LogBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { useDebounce } from 'use-debounce';
import { useHistory } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  statsItemContainer: {
    flex: 6/4,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  searchInputContainer: { 
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white", 
    margin: 10, 
    marginTop: -5, 
    padding: 10, 
    borderRadius: 3 
  },

  
});

export const ItemSeparator = () => <View style={styles.separator} />;

const RenderRepository = ({ item: repository, onPress }) => {
  
  return (
    <Pressable onPress={onPress ? () => onPress(repository.id) : undefined}>
      <RepositoryItem repository={repository}/>
    </Pressable>
  );
};

export const RepositoryListContainer = ( { repositories, onRepositoryPress, scrollEnabled }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  return (
    <FlatList
      scrollEnabled={scrollEnabled !== false}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RenderRepository item={item} onPress={onRepositoryPress}
      />
    }
      // other props
    />
  );
};

const RepositoryList = () => {
  const [ searchKeyWord, setSearchKeyWord ] = useState("");
  const [ searchKeyWordDebounced ] = useDebounce(searchKeyWord, 500);
  const [ sortString, setSortString ] = useState("latest");
  const [ sort, setSort ] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "ASC"
  });
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  
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
  const { repositories } = useRepositories({ ...sort, searchKeyword: searchKeyWordDebounced });
  const history = useHistory();
  const handleRepositoryPress = (id) => {
    history.push(`/repository/${id}`);
  };
  
  return (
    <ScrollView>
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
        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={20} color="black" style={{ flex: 0.5, alignSelf: "center"}}/>
          <TextInput onChangeText={(value) => setSearchKeyWord(value)} style={{ flex: 4 }} value={searchKeyWord}/>
          <Entypo name="cross" size={24} color="black" style={{ alignSelf: "flex-end"}} onPress={() => setSearchKeyWord("")}/>
        </View>
        <RepositoryListContainer repositories={repositories} onRepositoryPress={handleRepositoryPress} scrollEnabled={false}/>
      </View>
    </ScrollView>
  );
};

export default RepositoryList;