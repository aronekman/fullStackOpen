import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { toggleBlogFormVisibility } from './appReducer';
import { createNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    }
  }
});

export const initilizeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        createNotification(
          `a new blog '${newBlog.title}' by ${newBlog.author} added`
        )
      );
      dispatch(toggleBlogFormVisibility());
    } catch (error) {
      dispatch(
        createNotification(
          'creating a blog failed: ' + error.response.data.error,
          'alert'
        )
      );
    }
  };
};

export const { setBlogs, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;
