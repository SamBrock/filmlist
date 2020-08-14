const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: 'notifications',
  initialState: {
    id: null,
    msg: ''
  },
  reducers: {
    notificationsRecieved: (notification, action) => {
      notification.id = action.payload.id;
      notification.msg = action.payload.msg;
    },
    notificationsDeleted: (notification, action) => {
      notification.id = null;
      notification.msg = {};
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
export const getNotification = state => state.entities.notification; 