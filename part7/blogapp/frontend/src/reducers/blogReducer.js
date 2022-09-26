import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { createNotification } from './notificationReducer';
import { initializeUsers } from './userReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== String(action.payload));
    },
    updateBlog(state, action) {
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      );
    }
  }
});

export const initilizeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog, toggleVisibility) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        createNotification(
          `a new blog '${newBlog.title}' by ${newBlog.author} added`
        )
      );
      toggleVisibility();
    } catch (error) {
      dispatch(
        createNotification(
          `creating a blog failed: ${error.response.data.error}`,
          'alert'
        )
      );
    }
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id);
    dispatch(removeBlog(blog.id));
    dispatch(
      createNotification(
        `blog ${blog.title} by ${blog.author} removed succesfully`
      )
    );
    dispatch(initializeUsers());
  };
};

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      });
      dispatch(updateBlog(updatedBlog));
      dispatch(
        createNotification(
          `you liked '${updatedBlog.title}' by ${updatedBlog.author}`
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          `liking blog failed: ${error.response.data.error}`,
          'alert'
        )
      );
    }
  };
};

export const createComment = (id, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.comment(id, comment);
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      dispatch(
        createNotification(
          `commenting blog failed: ${error.response.data.error}`,
          'alert'
        )
      );
    }
  };
};

export const { setBlogs, appendBlog, removeBlog, updateBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
