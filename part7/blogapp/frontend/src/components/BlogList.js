import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const blogs = useSelector(({ blog }) => [...blog].sort(byLikes));

  const style = {
    padding: 3,
    marginBlock: 5,
    borderStyle: 'solid',
    borderWidth: 1
  };
  return (
    <div id="blogs">
      {blogs.map(blog => (
        <div key={blog.id} style={style}>
          <Link to={`blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
