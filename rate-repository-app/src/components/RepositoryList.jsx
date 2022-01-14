import React from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
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

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];
const SPACING = 10;
const ItemSeparator = () => <View style={styles.separator} />;

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
    <View style={styles.statsItemContainer}>
      <Text fontWeight="bold">{getRoundedCount(count)}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

const renderRepository = ({ item: repository }) => {
  return (
    <View style={{ flex: 1, paddingLeft: SPACING, paddingTop: SPACING, paddingBottom: SPACING,  backgroundColor: "white" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
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
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginTop: SPACING }}>
          <StatsItem text="Starts" count={repository.stargazersCount}/>
          <StatsItem text="Forks" count={repository.forksCount}/>
          <StatsItem text="Reviews" count={repository.reviewCount}/>
          <StatsItem text="Rating" count={repository.ratingAverage}/>

      </View>
      
    </View>
  );
};

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderRepository}
      // other props
    />
  );
};

export default RepositoryList;