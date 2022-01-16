import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import theme from '../theme';
import Button from './Button';
import Text from './Text';
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

const SPACING = 10;

const getRoundedCount = (count) => {
  if (count > 1000) {
    const thousands = count / 1000;
    const rounded = Math.round(thousands * 10) / 10;
    return `${rounded}k`;
  }

  return `${count}`;
};

const StatsItem = ({ count, text }) => {
  return (
    <View style={styles.statsItemContainer} testID='statsItem'>
      <Text fontWeight="bold">{getRoundedCount(count)}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository, onOpenInGithubPress}) => {
  const showButton = onOpenInGithubPress !== undefined;
  return (
    <View 
      style={{ padding: SPACING,  backgroundColor: "white" }}
      testID="repositoryItem"
      >
      <View style={{ flexDirection: "row" }}>
        <Image 
          source={{ url: repository.ownerAvatarUrl }} 
          style={{ height: 50, width: 50, borderRadius: 10 }}
        />
        <View style={{ paddingLeft: SPACING*1.5, flex: 1 }}>
          <Text color="textPrimary" fontWeight="bold" style={{ marginTop: SPACING/2 }}>{repository.fullName}</Text>
          <Text color="textSecondary" style={{ marginTop: SPACING }}>{repository.description}</Text>
          <View style={{ backgroundColor: theme.colors.primary, borderRadius: 3, alignSelf: "flex-start", padding: 3, marginTop: SPACING }}>
             <Text style={{ color: "white"}}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: SPACING }}>
          <StatsItem text="Stars" count={repository.stargazersCount}/>
          <StatsItem text="Forks" count={repository.forksCount}/>
          <StatsItem text="Reviews" count={repository.reviewCount}/>
          <StatsItem text="Rating" count={repository.ratingAverage}/>
      </View>
      { showButton && 
      <View>
        <Button onPress={onOpenInGithubPress ? () => onOpenInGithubPress(repository.url) : undefined} title="Open in GitHub"/>
      </View>
      }
      
    </View>
  );
};

export default RepositoryItem;