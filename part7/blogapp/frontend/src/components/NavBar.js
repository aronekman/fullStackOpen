import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../reducers/authReducer';

const NavBar = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        background: 'lightGray',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 5,
        alignItems: 'center'
      }}
    >
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <h5 style={{ margin: 0 }}>{user.name} logged in</h5>
      <button onClick={() => dispatch(logOut())}>logout</button>
    </div>
  );
};

export default NavBar;
