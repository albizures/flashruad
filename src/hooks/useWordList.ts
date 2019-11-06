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
  query List($language: Int!) {
    languageList(filter: { language: $language }) {
      id
      name
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
  const { loading, error, data, refetch } = useQuery<QueryList>(query);
  const list = extractList(loading, error, data);

  return {
    loading,
    error: Boolean(error),
    errorDetails: JSON.stringify(error),
    list,
    refetch,
  };
};

export default useWordList;
