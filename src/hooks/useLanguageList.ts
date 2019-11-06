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

const LIST_BY_NAME = gql`
  query List($name: String!) {
    languageList(filter: { name: $name }) {
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

  if (data) {
    return data.languageList;
  }

  return [];
};

const isValidValue = (text: string) => text.trim().length > 0;

const isString = (text: any) => typeof text === 'string';

// TODO: provided an initial data for server side redering purposes
const useLanguageList = (name?: string) => {
  const query = isString(name) ? LIST_BY_NAME : LIST;

  const { loading, error, data, refetch } = useQuery<QueryList>(query, {
    skip: isString(name) ? isValidValue(name) : false,
    variables: {
      name,
    },
  });

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
