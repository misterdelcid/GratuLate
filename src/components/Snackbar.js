import React from 'react';
import {Snackbar as MuiSnackbar } from '@material-ui/core';
import { IconButton } from './';
import CloseIcon from '@material-ui/icons/Close';

const Snackbar = (props) => {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setSnackbarOpen(false);
  };

  return (
    <div>
      <MuiSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.snackbarMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" handleClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default Snackbar;
