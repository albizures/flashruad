import '../style.css';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TextField from '../components/TextField';
import WordList from '../components/WordList';
import withApollo from '../components/hocs/withApollo';
import useWordList from '../hooks/useWordList';

const CREATE_WORD = gql`
  mutation CreateWord($word: String!) {
    createWord(word: $word) {
      id
      word
    }
  }
`;

const App = () => {
  const wordRef = React.useRef<HTMLInputElement>();
  const wordList = useWordList();
  const { refetch } = wordList;
  const [createWord, { data: mutationData }] = useMutation(CREATE_WORD, {
    onCompleted: refetch,
  });

  React.useEffect(() => {
    console.log('mutationData', mutationData);
  }, [mutationData]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const word = wordRef.current.value.trim();
    if (word.includes(' ')) {
      return alert("words shouldn't contain whitespaces");
    }

    createWord({
      variables: {
        word: wordRef.current.value,
      },
    });
  };

  return (
    <div className="bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 px-3 py-10 bg-gray-200 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={onSubmit} className="pb-8">
            <div className="mb-4">
              <TextField
                ref={wordRef}
                required={false}
                name="word"
                label="Word"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </form>
          <WordList {...wordList} />
        </div>
      </div>
    </div>
  );
};

export default withApollo(App);
