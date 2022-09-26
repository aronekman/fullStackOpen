import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import BlogDetails from './components/BlogDetails';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import UserDetails from './components/UserDetails';
import UserList from './components/UserList';
import { initializeAuth } from './reducers/authReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      {user ? (
        <>
          <NavBar user={user} />
          <h2>Blog app</h2>
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
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
