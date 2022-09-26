import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const blogs = useSelector(({ blogs }) => [...blogs].sort(byLikes));
  return (
    <div id="blogs">
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
