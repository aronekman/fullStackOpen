import React from 'react';

import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notifications }) =>
    notifications.length > 0 ? notifications[notifications.length - 1] : null
  );

  if (!notification) return null;

  const style = {
    color: notification.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return (
    <div id="notification" style={style}>
      {notification.message}
    </div>
  );
};

export default Notification;
