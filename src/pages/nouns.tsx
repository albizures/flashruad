import '../style.css';
import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import List from '../components/List';
import withApollo from '../components/hocs/withApollo';
import useLanguageList from '../hooks/useLanguageList';
import SelectField, { Choice as SelectChoice } from '../components/SelectField';
import ChoiceField, { Choice, ChoiceType } from '../components/ChoiceField';
import AudioField from '../components/AudioField';
import TextField from '../components/TextField';
import Form from '../components/Form';
import { Language, Gender } from '../types';

const CREATE_NOUN = gql`
  mutation CreateNoun(
    $word: String!
    $language: Float!
    $gender: Gender!
    $pronunciation: Float!
  ) {
    createNoun(
      word: $word
      language: $language
      gender: $gender
      pronunciation: $pronunciation
    ) {
      id
      word
    }
  }
`;

const CREATE_PRONUNCIATION = gql`
  mutation CreatePronunciation($file: String!) {
    createPronunciation(file: $file) {
      id
    }
  }
`;

const genderOptions: Choice[] = Object.keys(Gender).reduce((options, name) => {
  const gender = Gender[name];
  return options.concat({
    label: gender,
    value: gender,
  });
}, []);

const parseLanguageChoice = ({ id, name }: Language): SelectChoice => ({
  label: name,
  value: id,
});

const checkValue = (value: unknown): boolean => {
  return (
    (typeof value === 'number' && !Number.isNaN(value)) ||
    (typeof value === 'string' && value.trim().length > 0)
  );
};

const Nouns = () => {
  const audioRef = React.useRef<File>();
  const languageList = useLanguageList();
  const [createNoun] = useMutation(CREATE_NOUN);
  const { mutate } = useApolloClient();

  const createPronunciation = async (): Promise<number> => {
    const formData = new FormData();

    formData.append('.wav', audioRef.current);

    const result = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!result.ok) {
      throw new Error('Error creating the pronunciation');
    }

    const { file } = await result.json();
    const { data } = await mutate({
      mutation: CREATE_PRONUNCIATION,
      variables: {
        file,
      },
    });

    return Number(data.createPronunciation.id);
  };

  const onSubmit = async (event: React.FormEvent, form: Form) => {
    const { values } = form;
    event.preventDefault();

    const { word, language, gender } = values;

    const isValid =
      checkValue(word) &&
      checkValue(language) &&
      checkValue(gender) &&
      Boolean(audioRef.current);

    if (!isValid) {
      return alert('All values are required');
    }

    const pronunciation = await createPronunciation();

    createNoun({
      variables: {
        pronunciation,
        language: Number(language),
        word,
        gender,
      },
    });
  };

  return (
    <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 px-3 py-10 bg-gray-200 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Form onSubmit={onSubmit} className="pb-8">
            <div className="mb-4">
              <SelectField
                defaultValue=""
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
            <div className="mb-4">
              <TextField name="word" label="Word" />
            </div>
            <div className="mb-4">
              <ChoiceField
                choices={genderOptions}
                type={ChoiceType.RADIO}
                name="gender"
                legend="Gender"
              />
            </div>
            <AudioField ref={audioRef} />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </Form>
          {/* <List {...list} renderItem={renderItem} /> */}
        </div>
      </div>
    </div>
  );
};

export default withApollo(Nouns);
