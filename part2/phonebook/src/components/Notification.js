import React from 'react';

const Notification = ({notificationData, timer}) => {
    const {message, isError} = notificationData;
    const NotificationStyle = {
        color: 'green',
        background: 'lightgrey',
        width: '20%',
        fontSize: '15px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        textAlign: 'center'
      }
      const NotificationStyleError = {
        color: 'red'
      }

      const notify = (
      <div style={isError ? { ...NotificationStyle, ...NotificationStyleError } : NotificationStyle}>
        {message} ⏲: {timer} sec.
      </div>);

      const content = (message === '') ? null : notify;

    return (
      content
    )
  }

export default Notification