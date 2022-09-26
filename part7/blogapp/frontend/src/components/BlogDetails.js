import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deleteBlog, likeBlog } from '../reducers/blogReducer';
import { useParams, useNavigate } from 'react-router-dom';

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
      <h4>Comments</h4>
      <form onSubmit={addComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          id="comment"
        />
        <button id="add-comment" type="submit">
          add comment
        </button>
      </form>
      <div style={{ marginInline: 20 }}>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
