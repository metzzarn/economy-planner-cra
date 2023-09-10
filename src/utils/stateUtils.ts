import {
  STATE_FILE_ENDING,
  STATE_FILE_NAME,
  STATE_LOCAL_STORAGE_KEY,
  STATE_VERSION,
} from 'utils/constants';
import { EconomyState } from 'redux/common';
import CryptoJS from 'crypto-js';
import { loadAuth2, loadGapiInsideDOM } from 'gapi-script';
import { useEffect, useState } from 'react';

export const saveStateToFile = async (
  state: EconomyState,
  password: string,
) => {
  // Add version to the state before saving
  state.version = STATE_VERSION;

  const stateAsJson = JSON.stringify(state, null, 2);
  const file =
    password.length > 0
      ? CryptoJS.AES.encrypt(stateAsJson, password).toString()
      : stateAsJson;

  const blob = new Blob([file], {
    type: 'application/json',
  });

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
  const [gapi, setGapi] = useState<typeof gapi>(null);
  const [user, setUser] = useState<>(null);
  const GOOGLE_DRIVE_CLIENT_ID = process.env
    .VITE_GOOGLE_DRIVE_CLIENT_ID as string;
  const SCOPES =
    'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.resource';

  useEffect(() => {
    const loadGapi = async () => {
      const newGapi = await loadGapiInsideDOM();
      setGapi(newGapi);
    };
    loadGapi();
  }, []);

  useEffect(() => {
    if (!gapi) return;

    if (!user) {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(gapi, GOOGLE_DRIVE_CLIENT_ID, SCOPES);
        attachSignin(document.getElementById('customBtn'), auth2);
      };
      setAuth2();
    }
  }, [user, gapi]);

  if (!gapi) return;

  const updateUser = (currentUser) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    setUser({
      name: name,
      profileImg: profileImg,
    });
  };

  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
  };

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
      console.log('User signed out.');
    });
  };

  // Add version to the state before saving
  state.version = STATE_VERSION;

  const stateAsJson = JSON.stringify(state, null, 2);
  const file =
    password.length > 0
      ? CryptoJS.AES.encrypt(stateAsJson, password).toString()
      : stateAsJson;

  const DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  gapi.client
    .init({
      apiKey: process.env.VITE_GOOGLE_DRIVE_API_KEY,
      clientId: process.env.VITE_GOOGLE_DRIVE_CLIENT_ID,
      discoveryDocs: [DISCOVERY_DOC],
      scope: SCOPES,
    })
    .then(() => {
      const fileMetadata = {
        name: STATE_FILE_NAME + STATE_FILE_ENDING,
        mimeType: 'application/json',
      };
      const media = {
        mimeType: 'application/json',
        body: file,
      };
      gapi.client.drive.files
        .create({
          resource: fileMetadata,
          media: media,
          fields: 'id',
        })
        .then((response) => {
          console.log('File Id: ', response.result.id);
        });
    });

  const blob = new Blob([file], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = STATE_FILE_NAME + STATE_FILE_ENDING;
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
