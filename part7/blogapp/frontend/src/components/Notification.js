import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SnackBar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  if (!notification) return null;

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack(prev => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  useEffect(() => {
    if (notification.message) {
      setSnackPack(prev => [
        ...prev,
        { notification, key: new Date().getTime() }
      ]);
    }
  }, [notification]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <SnackBar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      <Alert
        severity={notification.type}
        variant="filled"
        onClose={handleClose}
      >
        {notification.message}
      </Alert>
    </SnackBar>
  );
};

export default Notification;
