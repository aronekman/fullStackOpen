import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import userService from '../services/user';
import { createNotification } from './notificationReducer';

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
      dispatch(createNotification(`${user.name} logged in!`));
    } catch (error) {
      dispatch(createNotification('wrong username/password', 'alert'));
    }
  };
};

export const logOut = () => {
  return async dispatch => {
    dispatch(setUser(null));
    userService.clearUser();
    dispatch(createNotification('good bye!'));
  };
};

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
