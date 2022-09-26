import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    appendNotification(state, action) {
      state.push(action.payload);
    },
    removeNotification(state) {
      state.shift();
    }
  }
});

export const createNotification = (message, type = 'info') => {
  return dispatch => {
    dispatch(appendNotification({ message, type }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};

export const { appendNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
