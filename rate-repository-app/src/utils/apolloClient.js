import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import getEnvVars from '../../environment';
const { APOLLO_URI } = getEnvVars();

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: APOLLO_URI,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;