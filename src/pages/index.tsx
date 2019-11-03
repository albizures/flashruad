import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TextField from '../components/TextField';
import AudioField from '../components/AudioField';
import ImageField from '../components/ImageField';
import ChoiceField, { ChoiceType } from '../components/ChoiceField';
import BooleanField from '../components/BooleanField';
import Textbox from '../components/TextboxField';

import '../style.css';
import withApollo from '../components/hocs/withApollo';

const wordGenders = [
  { value: 'MASCULINE', label: 'Masculine' },
  { value: 'FEMININE', label: 'Feminine' },
  { value: 'NEUTER', label: 'Neuter' },
];

const CREATE_WORD = gql`
  mutation CreateWord(
    $word: String!
    $description: String
    $translation: String
    $plural: Boolean!
    $gender: Gender!
    $image: String!
    $audio: String!
  ) {
    createWord(
      word: $word
      gender: $gender
      description: $description
      translation: $translation
      plural: $plural
      image: $image
      audio: $audio
    ) {
      word
      gender
      description
      translation
      plural
      image
      audio
    }
  }
`;

const App = () => {
  const [createWord, { data: mutationData }] = useMutation(CREATE_WORD);
  const wordRef = React.useRef<HTMLInputElement>();
  const audioRef = React.useRef<File>();
  const descriptionRef = React.useRef<HTMLTextAreaElement>();
  const translationRef = React.useRef<HTMLInputElement>();
  const imageRef = React.useRef<HTMLInputElement>();
  const pluralRef = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    console.log('mutationData', mutationData);
  }, [mutationData]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append('audio', audioRef.current);
    formData.append('image', imageRef.current.files[0]);

    const result = await fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: formData,
    });

    if (result.ok) {
      const data = await result.json();

      createWord({
        variables: {
          word: wordRef.current.value,
          description: descriptionRef.current.value,
          translation: translationRef.current.value,
          audio: data.audio,
          image: data.image,
          plural: Boolean(pluralRef.current.value),
          gender: 'FEMININE',
        },
      });

      return;
    }

    alert('error');
  };

  return (
    <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 px-3 py-10 bg-gray-200 flex justify-center">
      <div className="w-full max-w-6xl">
        <form
          onSubmit={onSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex mb-4">
            <div className="w-1/2 pr-4">
              <div className="mb-4">
                <TextField
                  ref={wordRef}
                  required={false}
                  name="word"
                  label="Word"
                />
              </div>
              <div className="md:flex md:items-center mb-4">
                <ChoiceField
                  choices={wordGenders}
                  legend="Gender"
                  type={ChoiceType.RADIO}
                  name="gender"
                />
              </div>
              <div className="md:flex md:items-center mb-4">
                <BooleanField
                  ref={pluralRef}
                  label="is plural?"
                  name="plural"
                />
              </div>
              <AudioField ref={audioRef} />
            </div>
            <div className="w-1/2 pl-4">
              <div className="mb-4">
                <TextField
                  ref={translationRef}
                  name="translation"
                  label="Translation"
                />
              </div>
              <div className="mb-4">
                <Textbox
                  ref={descriptionRef}
                  name="description"
                  label="Description"
                />
              </div>
              <ImageField ref={imageRef} name="image" label="Image" />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default withApollo(App);
