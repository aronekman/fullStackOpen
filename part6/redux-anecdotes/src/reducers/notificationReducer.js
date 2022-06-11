import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      state.push(action.payload);
    },
    removeNotification(state, action) {
      state.shift();
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
