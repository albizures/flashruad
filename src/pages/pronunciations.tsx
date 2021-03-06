import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TextField from '../components/TextField';
import AudioField from '../components/AudioField';

import '../style.css';
import withApollo from '../components/hocs/withApollo';

const CREATE_PRONUNCIATION = gql`
  mutation CreatePronunciation($file: String!, $word: Int!) {
    createPronunciation(file: $word, word: $word) {
      id
      file
    }
  }
`;

const Pronunciations = () => {
  const [create, { data: mutationData }] = useMutation(CREATE_PRONUNCIATION);
  const wordRef = React.useRef<HTMLInputElement>();
  const audioRef = React.useRef<File>();

  React.useEffect(() => {
    console.log('mutationData', mutationData);
  }, [mutationData]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append('.wav', audioRef.current);

    const result = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (result.ok) {
      const data = await result.json();

      create({
        variables: {
          word: Number(wordRef.current.value),
          file: data.file,
        },
      });

      return;
    }

    alert('error');
  };

  return (
    <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 px-3 py-10 bg-gray-200 flex justify-center">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={onSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <TextField
              ref={wordRef}
              required={false}
              name="word"
              label="Word"
            />
          </div>
          <AudioField ref={audioRef} />
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

export default withApollo(Pronunciations);
