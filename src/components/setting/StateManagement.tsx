import { fillObject, saveStateToFile } from 'utils/stateUtils';
import React, { useRef, useState } from 'react';
import { useStore } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from '@mui/material';
import { EconomyState } from 'redux/common';
import sampleData from 'components/data/sample_data.json';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleAuthentication } from 'components/common/GoogleAuthentication';
import { AuthProvider } from 'components/common/AuthProvider';

export const StateManagement = () => {
  const store = useStore<EconomyState>();
  const inputFile = useRef<HTMLInputElement>(null);
  const [chosenFileName, setChosenFileName] = useState<string>('');

  const [openLoadDialog, setOpenLoadDialog] = useState(false);
  const [openClearDialog, setOpenClearDialog] = useState(false);
  const [openSampleDialog, setOpenSampleDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleClickSnackbar = (message: string) => {
    setOpenSnackbar(true);
    setSnackbarMessage(message);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string,
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

  const handleClickOpenSampleDialog = () => {
    setOpenSampleDialog(true);
  };
  const handleCloseSampleDialog = () => {
    setOpenSampleDialog(false);
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
          const state = decryptJsonString(e.target.result.toString());
          fillObject(store.getState(), state);
          store.dispatch({ type: 'LOAD_STATE', payload: state });
        }
      };
      reader.readAsText(file);
      handleCloseLoadDialog();
      handleClickSnackbar('State loaded from file');
      setPassword('');
    }
  };

  const decryptJsonString = (str: string): string => {
    try {
      JSON.parse(str);
    } catch (e) {
      const bytes = CryptoJS.AES.decrypt(str, password);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return JSON.parse(str);
  };

  const onLoadSampleData = () => {
    store.dispatch({ type: 'LOAD_STATE', payload: sampleData });
    handleCloseSampleDialog();
    handleClickSnackbar('Sample data loaded');
  };

  const onClearLocalStorage = () => {
    store.dispatch({ type: 'RESET_STATE', payload: undefined });
    localStorage.clear();
    handleCloseClearDialog();
    handleClickSnackbar('Local storage cleared');
  };

  const handleSaveStateToFile = () => {
    saveStateToFile(store.getState(), password);
    setPassword('');
  };

  // const handleSaveStateToGoogleDrive = () => {
  //   saveStateToGoogleDrive(store.getState(), password);
  //   setPassword('');
  // };

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" size={'small'}>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            size={'small'}
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <Button onClick={handleSaveStateToFile}>Save state to file</Button>

          <AuthProvider>
            <GoogleAuthentication />
          </AuthProvider>
          {/*<Button onClick={handleSaveStateToGoogleDrive}>*/}
          {/*  Save state to Google Drive*/}
          {/*</Button>*/}
        </FormControl>
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
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" size={'small'}>
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                size={'small'}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              sx={{ m: 1 }}
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
      <div>
        <Button variant={'outlined'} onClick={handleClickOpenSampleDialog}>
          Load sample data
        </Button>
        <Dialog
          open={openSampleDialog}
          onClose={handleCloseSampleDialog}
          aria-labelledby={'load-state-title'}
          aria-describedby={'load-state-description'}
        >
          <DialogTitle id={'load-state-title'}>
            {'Load sample data?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={'load-state-description'}>
              Loading sample data will overwrite the current state.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSampleDialog}>Cancel</Button>

            <Button color={'warning'} onClick={onLoadSampleData}>
              Load
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
