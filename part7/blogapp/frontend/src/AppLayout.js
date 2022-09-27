import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  ListItemText,
  ListItemButton
} from '@mui/material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './reducers/authReducer';

const AppLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ marginBottom: 1 }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Blog app
          </Typography>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            {user.name} logged in
          </Typography>
          <Link
            style={{
              marginInline: 5,
              color: 'inherit',
              textDecoration: 'inherit'
            }}
            to="/"
          >
            <ListItemText>blogs</ListItemText>
          </Link>
          <Link
            style={{
              marginInline: 5,
              color: 'inherit',
              textDecoration: 'inherit'
            }}
            to="/users"
          >
            <ListItemText>users</ListItemText>
          </Link>
          <Box>
            <ListItemButton onClick={() => dispatch(logOut())}>
              <ListItemText>log out</ListItemText>
            </ListItemButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default AppLayout;
