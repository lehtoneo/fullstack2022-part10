import React from "react";
import { render, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId, debug } = render(<RepositoryListContainer repositories={repositories}/>);
      console.log(debug);
      const repositoryItems = getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      const [firstActualItem, secondActualItem] = repositories.edges.map(({ node }) => node);

      expect(firstRepositoryItem).toHaveTextContent(firstActualItem.fullName);
      expect(secondRepositoryItem).toHaveTextContent(secondActualItem.fullName);

      expect(firstRepositoryItem).toHaveTextContent(firstActualItem.description);
      expect(secondRepositoryItem).toHaveTextContent(secondActualItem.description);

      expect(firstRepositoryItem).toHaveTextContent(firstActualItem.language);
      expect(secondRepositoryItem).toHaveTextContent(secondActualItem.language);

      
      const firstRepositoryItemStatsItems = within(firstRepositoryItem).getAllByTestId("statsItem");
      const [ firstStars, firstForks, firstReviews, firstRating ] = firstRepositoryItemStatsItems;

      expect(firstStars).toHaveTextContent("Stars");
      expect(firstStars).toHaveTextContent("21.9k");
      expect(firstForks).toHaveTextContent("Forks");
      expect(firstForks).toHaveTextContent("1.6k");
      expect(firstReviews).toHaveTextContent("Reviews");
      expect(firstReviews).toHaveTextContent("3");
      expect(firstRating).toHaveTextContent("Rating");
      expect(firstRating).toHaveTextContent("88");

      const secondRepositoryItemStatsItems = within(secondRepositoryItem).getAllByTestId("statsItem");
      const [ secondStars, secondForks, secondReviews, secondRating ] = secondRepositoryItemStatsItems;

      expect(secondStars).toHaveTextContent("Stars");
      expect(secondStars).toHaveTextContent("1.8k");
      expect(secondForks).toHaveTextContent("Forks");
      expect(secondForks).toHaveTextContent("69");
      expect(secondReviews).toHaveTextContent("Reviews");
      expect(secondReviews).toHaveTextContent("3");
      expect(secondRating).toHaveTextContent("Rating");
      expect(secondRating).toHaveTextContent("72");
    });
  });
});