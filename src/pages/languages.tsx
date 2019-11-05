import '../style.css';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TextField from '../components/TextField';
import List from '../components/List';
import withApollo from '../components/hocs/withApollo';
import useLanguageList from '../hooks/useLanguageList';
import { Language } from '../types';

const CREATE_LANGUAGE = gql`
  mutation CreateWord($name: String!, $code: String!) {
    createLanguage(name: $name, code: $code) {
      id
      name
      code
    }
  }
`;

const renderItem = ({ id, name }: Language) => {
  return <li key={id}>{name}</li>;
};

const Languages = () => {
  const nameRef = React.useRef<HTMLInputElement>();
  const codeRef = React.useRef<HTMLInputElement>();
  const list = useLanguageList();
  const { refetch } = list;
  const [create] = useMutation(CREATE_LANGUAGE, {
    onCompleted: refetch,
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameRef.current.value.trim().toLowerCase();
    const code = codeRef.current.value.trim().toLowerCase();
    nameRef.current.value = '';
    codeRef.current.value = '';

    create({
      variables: {
        name,
        code,
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
                ref={nameRef}
                required={true}
                name="name"
                label="name"
              />
            </div>
            <div className="mb-4">
              <TextField
                ref={codeRef}
                required={true}
                name="code"
                label="code"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </form>
          <List {...list} renderItem={renderItem} />
        </div>
      </div>
    </div>
  );
};

export default withApollo(Languages);
