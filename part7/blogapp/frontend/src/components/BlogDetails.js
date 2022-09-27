import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deleteBlog, likeBlog } from '../reducers/blogReducer';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  List,
  ListSubheader,
  TextField,
  Typography
} from '@mui/material';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const blog = useSelector(({ blog }) => blog.find(b => b.id == id));
  const user = useSelector(({ auth }) => auth);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!blog) {
      navigate('/');
    }
  }, []);

  if (!blog) return null;
  const { title, author, url, likes, comments } = blog;

  const addedBy = blog.user?.name ? blog.user.name : 'anonymous';

  const handleRemove = () => {
    const ok = window.confirm(`remove '${title}' by ${author}?`);

    if (!ok) {
      return;
    }
    dispatch(deleteBlog(blog));
    navigate('/');
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const addComment = event => {
    event.preventDefault();
    dispatch(createComment(id, comment));
    setComment('');
  };

  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Button>
        <a href={url}>{url}</a>
      </Button>
      <Box>
        <Typography display="inline">{likes} likes</Typography>
        <Button variant="contained" onClick={handleLike}>
          like
        </Button>
      </Box>
      <Typography>added by {addedBy}</Typography>
      {user?.username === blog.user?.username && (
        <Button color="error" variant="contained" onClick={handleRemove}>
          remove
        </Button>
      )}
      <Typography variant="h4">Comments</Typography>
      <Box display="flex">
        <TextField
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          id="comment"
        />
        <Button variant="contained" onClick={addComment}>
          add comment
        </Button>
      </Box>
      <List>
        {comments.map((comment, index) => (
          <ListSubheader key={index}>{comment}</ListSubheader>
        ))}
      </List>
    </Box>
  );
};

export default BlogDetails;
