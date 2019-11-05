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
const useWordList = () => {
  const { loading, error, data, refetch } = useQuery<QueryList>(LIST);
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
