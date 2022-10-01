import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

const Login = ({ show, setToken }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!show) return null;

  const submit = event => {
    event.preventDefault();
    login({ variables: { username: name, password } });
    setName('');
    setPassword('');
  };

  return (
    <form onSubmit={submit}>
      <div>
        name{' '}
        <input value={name} onChange={({ target }) => setName(target.value)} />
      </div>
      <div>
        password{' '}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
