import {
  STATE_FILE_ENDING,
  STATE_FILE_NAME,
  STATE_LOCAL_STORAGE_KEY,
  STATE_VERSION,
} from 'utils/constants';
import { EconomyState } from 'redux/common';
import CryptoJS from 'crypto-js';
import { google } from 'googleapis';

export const saveStateToFile = async (
  state: EconomyState,
  password: string,
) => {
  const blob = createStateJsonBlob(state, password);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = STATE_FILE_NAME + STATE_FILE_ENDING;
  link.click();
};

export const saveStateToGoogleDrive = async (
  state: EconomyState,
  password: string,
) => {
  const GOOGLE_DRIVE_CLIENT_ID = process.env
    .VITE_GOOGLE_DRIVE_CLIENT_ID as string;
  const GOOGLE_DRIVE_API_KEY = process.env.VITE_GOOGLE_DRIVE_API_KEY as string;
  const SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.resource',
  ];
  const DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

  gapi.load('client', initializeGapiClient);

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_DRIVE_CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
  }

  const blob = createStateJsonBlob(state, password);
};

// export const saveStateToGoogleDrive = async (
//   state: EconomyState,
//   password: string,
// ) => {
//   const GOOGLE_DRIVE_CLIENT_ID = process.env
//     .VITE_GOOGLE_DRIVE_CLIENT_ID as string;
//   const GOOGLE_DRIVE_CLIENT_SECRET = process.env
//     .VITE_GOOGLE_DRIVE_CLIENT_SECRET as string;
//   const SCOPES = [
//     'https://www.googleapis.com/auth/drive.file',
//     'https://www.googleapis.com/auth/drive.resource',
//   ];
//   // const DISCOVERY_DOC =
//   //   'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
//
//   const auth = new GoogleAuth({
//     scopes: SCOPES,
//   });
//   const authClient = await auth.getClient();
//   const client = drive({ version: 'v3', auth });
//   const blob = createStateJsonBlob(state, password);
//
//   const requestBody = {
//     name: STATE_FILE_NAME + STATE_FILE_ENDING,
//     // fields: 'id',
//     fields: 'economy-planner-state-id',
//   };
//   const media = {
//     mimeType: 'application/json',
//     body: blob,
//   };
//   try {
//     const file = await client.files.create({
//       requestBody,
//       media: media,
//     });
//     console.log('File Id:', file.data.id);
//     return file.data.id;
//   } catch (err) {
//     // TODO(developer) - Handle error
//     throw err;
//   }
// };

const createStateJsonBlob = (state: EconomyState, password: string) => {
  // Add version to the state before saving
  state.version = STATE_VERSION;

  const stateAsJson = JSON.stringify(state, null, 2);
  const file =
    password.length > 0
      ? CryptoJS.AES.encrypt(stateAsJson, password).toString()
      : stateAsJson;

  return new Blob([file], {
    type: 'application/json',
  });
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
