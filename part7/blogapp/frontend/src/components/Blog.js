import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

const BlogDetails = ({ blog, own }) => {
  const dispatch = useDispatch();
  const { title, author, url, likes } = blog;

  const addedBy = blog.user?.name ? blog.user.name : 'anonymous';

  const handleRemove = () => {
    const ok = window.confirm(`remove '${title}' by ${author}?`);

    if (!ok) {
      return;
    }
    dispatch(deleteBlog(blog));
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  return (
    <div>
      <div>
        <a href={url}>{url}</a>
      </div>
      <div>
        {likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      {addedBy}
      {own && <button onClick={handleRemove}>remove</button>}
    </div>
  );
};

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const style = {
    padding: 3,
    marginBlock: 5,
    borderStyle: 'solid',
    borderWidth: 1
  };

  return (
    <div style={style} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <BlogDetails
          blog={blog}
          visible={visible}
          likeBlog={() => {} /*likeBlog*/}
          removeBlog={() => {} /*removeBlog*/}
          own={blog.user /*&& user.username === blog.user.username*/}
        />
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  })
};

export default Blog;
