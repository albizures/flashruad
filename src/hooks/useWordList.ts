import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const WORD_LIST = gql`
  query WordList {
    wordList {
      id
      word
    }
  }
`;

interface Word {
  id: number;
  word: string;
}

interface QueryWordList {
  wordList: Word[];
}

const extractList = (
  loading: boolean,
  error: Error,
  data: QueryWordList,
): Word[] => {
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
  const { loading, error, data, refetch } = useQuery<QueryWordList>(WORD_LIST);
  const wordList = extractList(loading, error, data);

  return {
    loading,
    error: Boolean(error),
    errorDetails: JSON.stringify(error),
    list: wordList,
    refetch,
  };
};

export default useWordList;
