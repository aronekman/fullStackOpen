import React, { useState } from 'react';
import Select from 'react-select';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = ({ show, token }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState(null);

  const result = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const handleSubmit = event => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: born } });
    setName(null);
    setBorn(null);
  };

  if (!show) {
    return null;
  }

  if (result.loading) return null;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <Select
                label="name"
                value={name ? { value: name, label: name } : null}
                onChange={option => setName(option.value)}
                options={result.data.allAuthors.map(option => {
                  return { value: option.name, label: option.name };
                })}
              />
            </div>
            <div>
              born
              <input
                type="number"
                value={born ?? ''}
                onChange={({ target }) =>
                  setBorn(target.value ? parseInt(target.value) : null)
                }
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Authors;
