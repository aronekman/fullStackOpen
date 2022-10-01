import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = props => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    if (result.loading) {
      setBookList([]);
      return;
    }
    if (genre) {
      setBookList(
        result.data.allBooks.filter(book => book.genres.includes(genre))
      );
      return;
    }
    setBookList(result.data.allBooks);
  }, [genre, result.data?.allBooks, result.loading]);

  useEffect(() => {
    if (result.loading) return;
    setGenreList([]);
    result.data.allBooks.forEach(b => {
      b.genres.forEach(g =>
        setGenreList(genres =>
          genres.includes(g) ? [...genres] : [...genres, g]
        )
      );
    });
  }, [result.data?.allBooks, result.loading]);

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
