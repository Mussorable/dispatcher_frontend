import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationRate {
  information: string;
  alert: string;
  error: string;
  success: string;
  important: string;
}

interface Notification {
  id: number
  message: string;
  rate: keyof NotificationRate;
}

interface NotificationsState {
  notifications: Notification[];
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  } as NotificationsState,
  reducers: {
    addNotification: (state, action: PayloadAction<{message: string; rate: keyof NotificationRate}>) => {
      state.notifications.push({
        id: Date.now(),
        message: action.payload.message,
        rate: action.payload.rate
      });
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    }
  }
});

export default notificationsSlice;