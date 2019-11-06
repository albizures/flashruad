import '../style.css';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import Form, { Fields } from '../components/Form';
import withApollo from '../components/hocs/withApollo';
import useWordList from '../hooks/useWordList';
import List from '../components/List';
import { Word } from '../types';
import useLanguageList from '../hooks/useLanguageList';

const CREATE_WORD = gql`
  mutation CreateWord($word: String!, $language: Float!) {
    createWord(word: $word, language: $language) {
      id
      word
    }
  }
`;

const renderItem = (item: Word) => {
  const { id, word, language } = item;

  return (
    <li key={id}>
      {word} ({language.name})
    </li>
  );
};

const Words = () => {
  const wordList = useWordList();
  const languageList = useLanguageList();
  const [createWord] = useMutation(CREATE_WORD, {
    onCompleted: wordList.refetch,
  });

  const onSubmit = (event: React.FormEvent, fields: Fields) => {
    event.preventDefault();

    const word = fields.word.value;
    const language = Number(fields.language.value);

    createWord({
      variables: {
        word,
        language,
      },
    });
  };

  return (
    <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 px-3 py-10 bg-gray-200 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Form onSubmit={onSubmit} className="pb-8">
            <div className="mb-4">
              <TextField required={false} name="word" label="Word" />
            </div>
            <div className="mb-4">
              <SelectField
                parseChoice={({ name, id }) => ({
                  label: name,
                  value: id,
                })}
                choices={languageList.list}
                required={false}
                name="language"
                label="Language"
              />
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

export default withApollo(Words);
