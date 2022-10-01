import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS, ME } from '../queries';

const Recommended = ({ show }) => {
  const user = useQuery(ME);
  const books = useQuery(ALL_BOOKS);
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    if (user.loading) {
      setFavoriteGenre(null);
      return;
    }
    setFavoriteGenre(user.data.me.favouriteGenre);
  }, [user.data?.me.favouriteGenre, user.loading]);

  useEffect(() => {
    if (books.loading) {
      setBookList([]);
      return;
    }
    if (favoriteGenre) {
      setBookList(
        books.data.allBooks.filter(b => b.genres.includes(favoriteGenre))
      );
      return;
    }
    setBookList([]);
  }, [books.data?.allBooks, books.loading, favoriteGenre]);
  useEffect(() => {}, []);

  if (!show) return null;

  return (
    <div>
      <h2>recommendations</h2>
      {favoriteGenre && (
        <div>
          books in your favorite genre <strong>{favoriteGenre}</strong>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
