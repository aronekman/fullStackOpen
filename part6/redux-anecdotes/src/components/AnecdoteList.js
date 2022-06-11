import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import {
  createNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    [...anecdotes]
      .filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );

  const handleVote = anecdote => {
    dispatch(vote(anecdote.id));
    dispatch(createNotification(`you voted for '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
