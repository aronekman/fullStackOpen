import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from '../queries';

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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(subscriptionData.data.bookAdded.title);
    }
  });

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
          {bookList.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
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
