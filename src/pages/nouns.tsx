import '../style.css';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import List from '../components/List';
import useWordList from '../hooks/useWordList';
import withApollo from '../components/hocs/withApollo';
import useLanguageList from '../hooks/useLanguageList';
import SelectField, { Choice } from '../components/SelectField';
import AudioField from '../components/AudioField';
import Form, { Fields } from '../components/Form';
import BooleanField from '../components/BooleanField';
import { Language, Word } from '../types';

const CREATE_LANGUAGE = gql`
  mutation CreateWord($name: String!, $code: String!) {
    createLanguage(name: $name, code: $code) {
      id
      name
      code
    }
  }
`;

const parseLanguageChoice = ({ id, name }: Language): Choice => ({
  label: name,
  value: id,
});

const parseWordChoice = ({ id, word }: Word): Choice => ({
  label: word,
  value: id,
});

const Nouns = () => {
  const [language, setLanguage] = React.useState<number>(undefined);
  const audioRef = React.useRef<File>();
  const languageList = useLanguageList();
  const [create] = useMutation(CREATE_LANGUAGE);
  const wordList = useWordList(language);

  const createPronunciation = async (): Promise<string> => {
    const formData = new FormData();

    formData.append('.wav', audioRef.current);

    const result = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!result.ok) {
      throw new Error('Error creating the pronunciation');
    }

    const data = await result.json();
    return data.file;
  };

  const onSubmit = async (event: React.FormEvent, fields: Fields) => {
    event.preventDefault();

    if (!audioRef.current) {
      return;
    }

    const pronunciation = await createPronunciation();

    create({
      variables: {
        pronunciation,
        word: Boolean(fields.word.value),
        isPlural: fields.isPlural.value,
      },
    });
  };

  const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = Number(event.target.value);
    if (!Number.isNaN(language)) {
      setLanguage(language);
    }
  };

  return (
    <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 px-3 py-10 bg-gray-200 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Form onSubmit={onSubmit} className="pb-8">
            <div className="mb-4">
              <SelectField
                defaultValue=""
                onChange={onLanguageChange}
                parseChoice={parseLanguageChoice}
                choices={languageList.list}
                name="language"
                label="Language"
              >
                <option value="" disabled>
                  -- select a language --
                </option>
              </SelectField>
            </div>
            {typeof language === 'number' && (
              <>
                <div className="mb-4">
                  <SelectField
                    defaultValue=""
                    parseChoice={parseWordChoice}
                    choices={wordList.list}
                    name="word"
                    label="Word"
                  >
                    <option value="" disabled>
                      -- select a word --
                    </option>
                  </SelectField>
                </div>
                <div className="mb-4">
                  <BooleanField label="is plural?" name="isPlural" />
                </div>
                <AudioField ref={audioRef} />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save
                </button>
              </>
            )}
          </Form>
          {/* <List {...list} renderItem={renderItem} /> */}
        </div>
      </div>
    </div>
  );
};

export default withApollo(Nouns);
