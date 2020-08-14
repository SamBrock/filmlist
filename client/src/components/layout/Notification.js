import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getNotification } from '../../store/notification'
import { TweenMax } from "gsap";

export default function Notification() {
  const [visible, setVisible] = useState(false);

  let notificationContainer = useRef(null);

  const notification = useSelector(getNotification);

  useEffect(() => {
    if (visible) TweenMax.fromTo(notificationContainer.current, .5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 })
    if (!visible) TweenMax.fromTo(notificationContainer.current, .5, { opacity: 1, y: 0 }, { opacity: 0, y: 10 })
  }, [visible])

  useEffect(() => {
    if (notification.id) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [notification])

  return (
    <div className="notification" ref={notificationContainer}>
      <span>{notification.msg}</span>
    </div>
  )
}
