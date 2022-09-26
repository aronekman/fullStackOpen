import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    auth: authReducer
  }
});

export default store;
