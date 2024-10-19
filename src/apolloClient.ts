import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// console.log(process.env.REACT_APP_GITHUB_TOKEN);
const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});
// console.log(httpLink);
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
