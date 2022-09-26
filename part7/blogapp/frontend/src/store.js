import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import appReducer from './reducers/appReducer';

const store = configureStore({
  reducer: {
    app: appReducer,
    notifications: notificationReducer,
    blogs: blogReducer
  }
});

export default store;
