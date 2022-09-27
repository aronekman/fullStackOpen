import { Box } from '@mui/material';
import React from 'react';
import NewBlogForm from './NewBlogForm';
import BlogList from './BlogList';

const Blogs = () => {
  return (
    <Box>
      <NewBlogForm />
      <BlogList />
    </Box>
  );
};

export default Blogs;
