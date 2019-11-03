import React from 'react';
import withApollo from '../components/hocs/withApollo';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_GREETING = gql`
  query Name {
    hello
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery(GET_GREETING);
  if (loading) return <p>Loading ...</p>;
  return (
    <h1>
      Hello {JSON.stringify(data)} {JSON.stringify(error)}!
    </h1>
  );
};

export default withApollo(Test);
