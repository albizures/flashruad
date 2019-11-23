import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LIST = gql`
  query List {
    wordList {
      id
      word
      language {
        name
      }
    }
  }
`;

const LIST_BY_LANGUAGE = gql`
  query List($language: Float!) {
    wordList(filter: { language: $language }) {
      id
      word
    }
  }
`;

interface Entity {
  id: number;
  word: string;
}

interface QueryList {
  wordList: Entity[];
}

const extractList = (
  loading: boolean,
  error: Error,
  data: QueryList,
): Entity[] => {
  if (loading) {
    return [];
  }
  if (error) {
    return [];
  }

  return data.wordList;
};
// TODO: provided an initial data for server side redering purposes
const useWordList = (language?: number) => {
  const query = Number.isInteger(language) ? LIST_BY_LANGUAGE : LIST;
  const { loading, error, data, refetch } = useQuery<QueryList>(query, {
    variables: {
      language,
    },
  });
  const list = extractList(loading, error, data);

  console.log(Boolean(error) && error);

  return {
    loading,
    error: Boolean(error),
    errorDetails: JSON.stringify(error),
    list,
    refetch,
  };
};

export default useWordList;
