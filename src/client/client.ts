import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, createHttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
  uri: 'http://localhost:51077',
  fetch: fetch,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});
