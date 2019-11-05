import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Language } from '../types';

const LIST = gql`
  query List {
    languageList {
      id
      name
    }
  }
`;

interface QueryList {
  languageList: Language[];
}

const extractList = (
  loading: boolean,
  error: Error,
  data: QueryList,
): Language[] => {
  if (loading) {
    return [];
  }
  if (error) {
    return [];
  }

  return data.languageList;
};
// TODO: provided an initial data for server side redering purposes
const useLanguageList = () => {
  const { loading, error, data, refetch } = useQuery<QueryList>(LIST);
  const list = extractList(loading, error, data);

  return {
    loading,
    error: Boolean(error),
    errorDetails: String(error),
    list,
    refetch,
  };
};

export default useLanguageList;
