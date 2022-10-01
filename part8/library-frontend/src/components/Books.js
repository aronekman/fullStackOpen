import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../queries';

const Books = props => {
  const [genre, setGenre] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const allGenres = useQuery(ALL_GENRES);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    setBookList(result.data?.allBooks ?? []);
  }, [genre, result.data?.allBooks, result.loading]);

  useEffect(() => {
    setGenreList(allGenres.data?.allGenres ?? []);
  }, [allGenres.data?.allGenres, allGenres.loading]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreList.map(g => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>allBooks</button>
    </div>
  );
};

export default Books;
