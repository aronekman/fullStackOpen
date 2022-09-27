import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';
import BlogDetails from './components/BlogDetails';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
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

  if (!user)
    return (
      <>
        <Notification />
        <LoginForm />;
      </>
    );

  return (
    <>
      <Notification />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
