import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = props => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState(null);

  const result = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const handleSubmit = event => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: born } });
    setName('');
    setBorn(null);
  };

  if (!props.show) {
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
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
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
    </div>
  );
};

export default Authors;
