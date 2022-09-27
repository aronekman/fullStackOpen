import { Box, Button, Stack, TextField, Typography } from '@mui/material';
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
    return (
      <Button variant="contained" onClick={() => setVisible(true)}>
        new note
      </Button>
    );
  }

  return (
    <Box maxWidth="sm" marginBottom={2}>
      <Typography marginBottom={1} variant="h5">
        Create new
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            label="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant="contained" type="submit">
            create
          </Button>
          <Button onClick={() => setVisible(false)}>cancel</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default NewBlogForm;
