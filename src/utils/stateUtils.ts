import {
  STATE_FILE_NAME,
  STATE_LOCAL_STORAGE_KEY,
  STATE_VERSION,
} from 'utils/constants';
import { EconomyState } from 'redux/common';
import CryptoJS from 'crypto-js';

export const saveStateToFile = async (
  state: EconomyState,
  password: string,
) => {
  // Add version to the state before saving
  state.version = STATE_VERSION;

  const stateAsJson = JSON.stringify(state, null, 2);
  const ciphertext = CryptoJS.AES.encrypt(stateAsJson, password).toString();

  const blob = new Blob([password.length > 0 ? ciphertext : stateAsJson], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = STATE_FILE_NAME;
  link.click();
};

export const loadStateFromLocalStorage = (state: EconomyState) => {
  try {
    const serializedState = localStorage.getItem(STATE_LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const loadedState = JSON.parse(serializedState);
    fillObject(state, loadedState);
    return loadedState;
  } catch (err) {
    console.log(err);
  }
};

export const fillObject = (from: any, to: any) => {
  for (const key in from) {
    if (
      from.hasOwnProperty(key) &&
      !(key === '__proto__' || key === 'constructor')
    ) {
      if (Object.prototype.toString.call(from[key]) === '[object Object]') {
        if (!to.hasOwnProperty(key)) {
          to[key] = {};
        }
        fillObject(from[key], to[key]);
      } else if (!to.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    }
  }
};
