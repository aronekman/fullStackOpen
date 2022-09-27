import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUsers } from '../reducers/userReducer';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeUsers());
  });

  return (
    <Box maxWidth="sm">
      <Typography variant="h4">Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={user.id}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserList;
