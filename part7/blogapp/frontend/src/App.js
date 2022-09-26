import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { toggleBlogFormVisibility } from './reducers/appReducer';
import { initilizeBlogs } from './reducers/blogReducer';
import { createNotification } from './reducers/notificationReducer';

import loginService from './services/login';
import userService from './services/user';

const App = () => {
  const dispatch = useDispatch();
  const appState = useSelector(({ app }) => app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initilizeBlogs());
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password
      })
      .then(user => {
        setUser(user);
        userService.setUser(user);
        dispatch(createNotification(`${user.name} logged in!`));
      })
      .catch(() => {
        dispatch(createNotification('wrong username/password', 'alert'));
      });
  };

  const logout = () => {
    setUser(null);
    userService.clearUser();
    dispatch(createNotification('good bye!'));
  };

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable
        buttonLabel="new note"
        visible={appState.blogFormVisible}
        toggleVisibility={() => dispatch(toggleBlogFormVisibility())}
      >
        <NewBlogForm />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default App;
