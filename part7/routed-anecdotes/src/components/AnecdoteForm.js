import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const AnecdoteForm = props => {
  const navigate = useNavigate();
  const { reset: resetContent, ...content } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetInfo, ...info } = useField('text');

  const handleSubmit = e => {
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate('/');
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
