import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { getNotifications } from '../store/notification';
import Notification from './Notification';

export default function NotificationList() {
  const loadedNotifications = useSelector(getNotifications);
  const [notifications, setNotifications] = useState(loadedNotifications);

  useEffect(() => {
    setNotifications(loadedNotifications);
  }, [loadedNotifications])

  return (
    <div className="max-w-xl flex flex-col items-start fixed z-50 bottom-6 left-6">
      {notifications.map(n => <Notification id={n.id} msg={n.msg} />)}
    </div>
  )
}
