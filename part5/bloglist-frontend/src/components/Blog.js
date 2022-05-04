import { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBlock: 2.5,
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeClicked = () => {
    const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    updateBlog(newBlog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLikeClicked}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
