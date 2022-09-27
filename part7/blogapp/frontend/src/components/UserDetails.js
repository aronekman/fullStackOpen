import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, List, ListSubheader, Typography } from '@mui/material';

const UserDetails = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const user = useSelector(({ user }) => user.find(u => u.id === id));

  useEffect(() => {
    if (!user) {
      navigate('/users');
    }
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Typography variant="h4">{user.name}</Typography>
      <Typography>added blogs</Typography>
      <List>
        {user.blogs.map(blog => (
          <ListSubheader key={blog.id}>{blog.title}</ListSubheader>
        ))}
      </List>
    </Box>
  );
};

export default UserDetails;
