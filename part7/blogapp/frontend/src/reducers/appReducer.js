import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    blogFormVisible: false
  },
  reducers: {
    toggleBlogFormVisibility(state) {
      return {
        ...state,
        blogFormVisible: !state.blogFormVisible
      };
    }
  }
});

export const { toggleBlogFormVisibility } = appSlice.actions;
export default appSlice.reducer;
