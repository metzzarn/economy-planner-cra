import { saveStateToFile } from 'utils/stateUtils';
import React, { useRef, useState } from 'react';
import { useStore } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';

export const StateManagement = () => {
  const store = useStore();
  const inputFile = useRef<HTMLInputElement>(null);
  const [chosenFileName, setChosenFileName] = useState<string>('');

  const [openLoadDialog, setOpenLoadDialog] = useState(false);
  const [openClearDialog, setOpenClearDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClickSnackbar = (message: string) => {
    setOpenSnackbar(true);
    setSnackbarMessage(message);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
    setSnackbarMessage('');
  };
  const handleClickOpenLoadDialog = () => {
    setOpenLoadDialog(true);
  };
  const handleCloseLoadDialog = () => {
    setOpenLoadDialog(false);
    setChosenFileName('');
  };

  const handleClickOpenClearDialog = () => {
    setOpenClearDialog(true);
  };
  const handleCloseClearDialog = () => {
    setOpenClearDialog(false);
  };

  const onLoadStateFromFile = () => {
    if (inputFile.current?.files) {
      const file = inputFile.current.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const state = JSON.parse(e.target.result.toString());
          store.dispatch({ type: 'LOAD_STATE', payload: state });
        }
      };
      reader.readAsText(file);
      handleCloseLoadDialog();
      handleClickSnackbar('State loaded from file');
    }
  };

  const onClearLocalStorage = () => {
    store.dispatch({ type: 'RESET_STATE', payload: undefined });
    localStorage.clear();
    handleCloseClearDialog();
    handleClickSnackbar('Local storage cleared');
  };

  return (
    <div>
      <div>
        <Button onClick={() => saveStateToFile(store.getState())}>
          Save state to file
        </Button>
      </div>

      <div>
        <Button variant={'outlined'} onClick={handleClickOpenLoadDialog}>
          Load state from file
        </Button>
        <Dialog
          open={openLoadDialog}
          onClose={handleCloseLoadDialog}
          aria-labelledby={'load-state-title'}
          aria-describedby={'load-state-description'}
        >
          <DialogTitle id={'load-state-title'}>
            {'Load state from file?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={'load-state-description'}>
              {chosenFileName.length > 0
                ? 'Loading state from file will overwrite the current state.'
                : 'Please choose a file to load.'}
            </DialogContentText>

            <Button
              variant="outlined"
              onClick={() => inputFile?.current?.click()}
            >
              Choose file
            </Button>
            <input
              hidden
              type={'file'}
              ref={inputFile}
              onChange={(e) =>
                e.target?.files && setChosenFileName(e.target?.files[0]?.name)
              }
            />
            <div>{chosenFileName}</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLoadDialog}>Cancel</Button>

            <Button
              disabled={chosenFileName.length === 0}
              color={'warning'}
              onClick={onLoadStateFromFile}
            >
              Load
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Button variant={'outlined'} onClick={handleClickOpenClearDialog}>
          Clear local storage
        </Button>
        <Dialog
          open={openClearDialog}
          onClose={handleCloseClearDialog}
          aria-labelledby={'clear-state-title'}
          aria-describedby={'clear-state-description'}
        >
          <DialogTitle id={'clear-state-title'}>
            {'Clear local storage?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={'clear-state-description'}>
              Clearing local storage will reset the state to the initial state
              and is irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseClearDialog}>Cancel</Button>

            <Button color={'warning'} onClick={onClearLocalStorage} autoFocus>
              Clear
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};
