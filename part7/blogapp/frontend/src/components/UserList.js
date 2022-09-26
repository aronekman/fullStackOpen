import React from 'react';
import { useSelector } from 'react-redux';

const UserList = () => {
  const users = useSelector(({ user }) => user);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <th />
          <th>blogs created</th>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
