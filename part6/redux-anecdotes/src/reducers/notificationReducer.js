import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    createNotification(state, action) {
      state.push(action.payload);
    },
    removeNotification(state, action) {
      console.log('je');
      state.shift();
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, displayTime) => {
  return dispatch => {
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, displayTime * 1000);
  };
};

export default notificationSlice.reducer;
