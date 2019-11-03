import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

const createClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:8080/graphql',
      // credentials: 'same-origin',
      fetch,
    }),
    cache: new InMemoryCache().restore({}),
  });
};

const withApollo = <Props extends object>(
  Component: React.FC<Props>,
): React.FC<Props> => {
  const WithApollo: React.FC<Props> = (props) => {
    const client = React.useMemo(createClient, []);

    return (
      <ApolloProvider client={client}>
        <Component {...props} />
      </ApolloProvider>
    );
  };

  return WithApollo;
};

export default withApollo;
