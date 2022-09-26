import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <div style={{ marginInline: 20 }}>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
