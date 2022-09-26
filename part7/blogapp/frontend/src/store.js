import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    user: authReducer
  }
});

export default store;
