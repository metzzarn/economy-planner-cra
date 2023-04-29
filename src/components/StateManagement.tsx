import { saveStateToFile } from 'utils/stateUtils';
import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { Button } from '@mui/material';

export const StateManagement = () => {
  const store = useStore();
  const inputFile = React.useRef<HTMLInputElement>(null);
  const [chosenFileName, setChosenFileName] = useState<string>('');

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
    }
  };

  const onClearLocalStorage = () => {
    store.dispatch({ type: 'RESET_STATE', payload: undefined });
    localStorage.clear();
  };

  return (
    <div>
      <form onSubmit={() => saveStateToFile(store.getState())}>
        <div>
          <Button variant="contained" type={'submit'}>
            Save state to file
          </Button>
        </div>
      </form>

      <div>
        <Button variant="outlined" onClick={() => inputFile?.current?.click()}>
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
        <Button
          variant="contained"
          type={'submit'}
          onClick={onLoadStateFromFile}
        >
          Load state from file
        </Button>
      </div>

      <div>
        <Button
          variant="contained"
          type={'submit'}
          onClick={onClearLocalStorage}
        >
          Clear local storage
        </Button>
      </div>
    </div>
  );
};
