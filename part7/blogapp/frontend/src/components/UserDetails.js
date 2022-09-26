import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const users = useSelector(({ user }) => user);
  const id = useParams().id;
  const user = users.find(user => user.id === id);

  if (!user) {
    return null;
  }
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
