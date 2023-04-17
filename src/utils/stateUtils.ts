import { STATE_FILE_NAME, STATE_LOCAL_STORAGE_KEY } from 'utils/constants';

export const saveStateToFile = (state: any) => {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = STATE_FILE_NAME;
  link.click();
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(STATE_LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
  }
};
