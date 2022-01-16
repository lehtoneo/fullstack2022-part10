import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Linking, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import useRepository from '../hooks/useRepository';

import Text from './Text';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const ratingWidth = 40;
const styles = StyleSheet.create({
  rating: { 
    borderRadius: ratingWidth / 2, 
    borderWidth: 1, 
    borderColor: theme.colors.primary, 
    width: ratingWidth,
    height: ratingWidth,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  ratingText: {
    color: theme.colors.primary,
    textAlign: "center"
  }
});

const RenderReview = ( { review }) => {
  const createAtDate = new Date (review.createdAt);
  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">{format(createAtDate, 'dd.MM.yyyy')}</Text>
        </View>
      </View>
      <Text style={{ paddingLeft: ratingWidth + 10 }}>{review.text}</Text>
    </View>
  );
};

const RepositoryPage = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  const [ reviewList, setReviewList ] = useState([]);
  useEffect(() => {
    if (repository) {
      const newList = repository.reviews.edges.map(({ node }) => node);
      setReviewList(newList);
    }
  },[repository]);
  const handleOpenInGithubPress = (url) => {
    Linking.openURL(url);
  };

  if (!repository) {
    return <ActivityIndicator/>;
  }

  return (
    <View>
      <FlatList
      data={reviewList}
      renderItem={({ item }) => <RenderReview review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} onOpenInGithubPress={handleOpenInGithubPress}/>}
    />
    </View>
  );
};

export default RepositoryPage;