import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
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

export const setNotification = (message, displayTime) => {
  return async dispatch => {
    dispatch(createNotification(message));
    setTimeout(() => {
      removeNotification();
    }, displayTime * 100);
  };
};

export default notificationSlice.reducer;
