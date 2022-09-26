import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    auth: authReducer,
    user: userReducer
  }
});

export default store;
