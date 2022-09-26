import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    }
  }
});

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
