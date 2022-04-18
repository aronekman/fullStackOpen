import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getInitialBlogs = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    };
    getInitialBlogs();
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    const user = await loginService.login({
      username,
      password,
    });
    console.log(user);
    setUser(user);
    setUsername('');
    setPassword('');
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogsForm = () => (
    <>
      <h2>blogs</h2>
      <p>{user.name} loggin in</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  return <div>{user === null ? loginForm() : blogsForm()}</div>;
};

export default App;
