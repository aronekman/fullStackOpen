import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { message: null, type: undefined },
  reducers: {
    setNotification(state, action) {
      return {
        ...action.payload,
        type: action.payload?.type ? action.payload.type : 'success'
      };
    }
  }
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
