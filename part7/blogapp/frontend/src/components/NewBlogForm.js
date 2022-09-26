import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      createBlog({ title, author, url, likes: 0 }, () => setVisible(false))
    );
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  if (!visible) {
    return <button onClick={() => setVisible(true)}>new note</button>;
  }

  return (
    <div>
      <h2 style={{ marginBlock: 5 }}>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </div>
        <div>
          url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </div>
        <button id="create-butto" type="submit">
          create
        </button>
      </form>
      <button onClick={() => setVisible(false)}>cancel</button>
    </div>
  );
};

export default NewBlogForm;
