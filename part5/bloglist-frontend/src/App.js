import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('success');

  useEffect(() => {
    const getInitialBlogs = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    };
    getInitialBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const setNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (e) {
      setNotification('wrong username or password', 'error');
    }
  };

  const blogFormRef = useRef();

  const createBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        'success'
      );
    } catch (e) {
      setNotification('failed to add blog', 'error');
    }
  };

  const updateBlog = async blog => {
    try {
      const updatedBlog = await blogService.update(blog);
      setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)));
    } catch (e) {
      setNotification(
        `Note '${blog.title}' was already removed from server`,
        'error'
      );
    }
  };

  const deleteBlog = async blog => {
    try {
      const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
      if (ok) {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter(b => b.id !== blog.id));
      }
    } catch (e) {
      setNotification(`Deletion of ${blog.name} failed`, 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={
                  blog.user.username === user.username ? deleteBlog : null
                }
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
