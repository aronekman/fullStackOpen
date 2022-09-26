import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import UserList from './components/UserList';
import { initializeAuth, logOut } from './reducers/authReducer';
import { initilizeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);

  useEffect(() => {
    dispatch(initilizeBlogs());
    dispatch(initializeAuth());
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <Notification />
      {user ? (
        <>
          <h2>Blogs</h2>
          <div>
            {user.name} logged in
            <br />
            <button onClick={() => dispatch(logOut())}>logout</button>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <NewBlogForm />
                  <BlogList />
                </div>
              }
            />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
