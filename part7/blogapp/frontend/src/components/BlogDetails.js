import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const blog = useSelector(({ blog }) => blog.find(b => b.id == id));
  const user = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (!blog) {
      navigate('/');
    }
  }, []);

  if (!blog) return null;
  const { title, author, url, likes } = blog;

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

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <a href={url}>{url}</a>
      </div>
      <div>
        {likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      added by {addedBy}
      <br />
      {user?.username === blog.user?.username && (
        <button onClick={handleRemove}>remove</button>
      )}
    </div>
  );
};

export default BlogDetails;
