import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'notifications',
  initialState: {
    data: [],
  },
  reducers: {
    notificationsRecieved: (notifications, action) => {
      notifications.data = [...notifications.data, { id: action.payload.id, msg: action.payload.msg }]
    },
    notificationsDeleted: (notifications, action) => {
      notifications.data = []
    }
  }
})

export default slice.reducer;

export const { notificationsRecieved, notificationsDeleted } = slice.actions;

export const clearNotifications = () => dispatch => {
  dispatch({ type: notificationsDeleted.type });
}

export const addNotification = (id, msg) => dispatch => {
  console.log('add notification!!');
  
}

// Selectors
export const getNotifications = state => state.entities.notifications.data;