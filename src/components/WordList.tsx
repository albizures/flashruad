import React from 'react';

interface Word {
  id: number;
  word: string;
}

interface PropTypes {
  loading: boolean;
  errorDetails: string;
  error: boolean;
  list: Word[];
}

const showDetails = process.env.NODE_ENV !== 'production';
const WordList: React.FC<PropTypes> = (props) => {
  const { loading, errorDetails, error, list } = props;
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    if (showDetails) {
      return (
        <div>
          <p>something bad happend...</p>
          <p>${errorDetails}</p>
        </div>
      );
    }
    return (
      <div>
        <p>something bad happend...</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {list.map(({ id, word }) => {
          return <li key={id}>{word}</li>;
        })}
      </ul>
    </div>
  );
};

export default WordList;
