import '../style.css';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ChoiceField, { ChoiceType } from '../components/ChoiceField';
import Form from '../components/Form';
import withApollo from '../components/hocs/withApollo';
import useWordList from '../hooks/useWordList';
import useLanguageList from '../hooks/useLanguageList';
import List from '../components/List';
import { Word, Language } from '../types';

const CREATE_WORD = gql`
  mutation CreateWord($word: String!) {
    createWord(word: $word) {
      id
      word
    }
  }
`;

const parseList = (list: Language[]) => {
  return list.map(({ name, id }) => ({
    label: name,
    value: id,
  }));
};

const renderItem = (item: Word) => {
  const { id, word, language } = item;

  return (
    <li key={id}>
      {word} ({language.name})
    </li>
  );
};

const App = () => {
  const wordRef = React.useRef<HTMLInputElement>();
  const wordList = useWordList();
  const [createWord] = useMutation(CREATE_WORD, {
    onCompleted: wordList.refetch,
  });

  const languageList = useLanguageList();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const word = wordRef.current.value.trim().toLowerCase();
    wordRef.current.value = '';

    createWord({
      variables: {
        word,
      },
    });
  };

  return (
    <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 px-3 py-10 bg-gray-200 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Form onSubmit={onSubmit} className="pb-8">
            <div className="mb-4">
              {/* <ChoiceField
                name="language"
                legend="Language"
                type={ChoiceType.SELECT}
                choices={parseList(languageList.list)}
              ></ChoiceField> */}
              {/* <TextField
                ref={wordRef}
                required={false}
                name="word"
                label="Word"
              /> */}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </Form>
          <List {...wordList} renderItem={renderItem} />
        </div>
      </div>
    </div>
  );
};

export default withApollo(App);
