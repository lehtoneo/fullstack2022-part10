import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import useAuthorizedUser from "../hooks/useAuthorizedUser";
import { RenderReview } from './RepositoryPage';
import { ItemSeparator } from './RepositoryList';

const UserReviewsPage = () => {
  const { user } = useAuthorizedUser(true);
  const [ reviewList, setReviewList ] = useState([]);

  useEffect(() => {
    if (user?.reviews) {
      const newList = user.reviews.edges.map(({ node })=> node);
      setReviewList(newList);
    }
  },[user]);

  return (
    <View>
      <FlatList 
      data={reviewList}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RenderReview review={item}/>}
      
    />
    </View>
  );
};

export default UserReviewsPage;