import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationRate {
  information: string;
  alert: string;
  error: string;
  success: string;
  important: string;
}

interface Notification {
  message: string;
  rate: keyof NotificationRate;
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    rate: "information"
  } as Notification,
  reducers: {
    setNotification: (state, action: PayloadAction<Notification>) => {
      state.message = action.payload.message;
      state.rate = action.payload.rate;
    }
  }
});

export default notificationSlice;