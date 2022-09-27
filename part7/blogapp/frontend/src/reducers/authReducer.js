import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import userService from '../services/user';
import { setNotification } from './notificationReducer';

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    }
  }
});

export const initializeAuth = () => {
  return async dispatch => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  };
};

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password });
      userService.setUser(user);
      dispatch(setUser(user));
      dispatch(setNotification({ message: `${user.name} logged in!` }));
    } catch (error) {
      dispatch(
        setNotification({ message: 'wrong username/password', type: 'error' })
      );
    }
  };
};

export const logOut = () => {
  return async dispatch => {
    dispatch(setUser(null));
    userService.clearUser();
    dispatch(setNotification({ message: 'good bye!' }));
  };
};

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
