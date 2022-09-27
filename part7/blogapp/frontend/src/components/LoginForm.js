import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fieldsError, setFieldsError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (username && password) {
      dispatch(login(username, password));
    } else {
      setFieldsError(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h2">Log in to application</Typography>
          <TextField
            type="text"
            label="username"
            onChange={({ target }) => setUsername(target.value)}
            error={username === '' && fieldsError}
          />
          <TextField
            type="password"
            label="password"
            onChange={({ target }) => setPassword(target.value)}
            error={password === '' && fieldsError}
          />
          <Button type="submit" variant="contained">
            login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
