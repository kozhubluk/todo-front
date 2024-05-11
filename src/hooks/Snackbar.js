import { useState } from 'react';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const setSnackbar = (message) => {
    setMessage(message);
    openSnackbar();
  };

  return { open, message, openSnackbar, handleClose, setSnackbar };
};
