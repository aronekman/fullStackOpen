import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import { initializeUser, logOut } from './reducers/authReducer';
import { initilizeBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initilizeBlogs());
    dispatch(initializeUser());
  }, []);

  return (
    <div>
      <Notification />
      {user ? (
        <>
          <h2>Blogs</h2>
          <div>
            {user.name} logged in
            <button onClick={() => dispatch(logOut())}>logout</button>
          </div>
          <NewBlogForm />
          <BlogList />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
