import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { setAnecdotes } from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAnecdotes = async () => {
      const initialAnecdotes = await anecdoteService.getAll();
      dispatch(setAnecdotes(initialAnecdotes));
    };
    fetchAllAnecdotes();
  });

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
