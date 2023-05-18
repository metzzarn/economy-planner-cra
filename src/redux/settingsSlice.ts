import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Currency, SettingsState } from 'redux/common';

const initialState: SettingsState = {
  decimalPlaces: 2,
  currency: {
    currency: 'SEK',
    locale: 'sv-SE',
  },
  saveTab: false,
  savedTab: {
    home: 0,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDecimalPlaces: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined) {
        return;
      }

      state.decimalPlaces = action.payload;
    },
    setCurrency: (state, action: PayloadAction<Currency>) => {
      if (action.payload === undefined) {
        return;
      }

      state.currency = action.payload;
    },
    setSaveTab: (state, action: PayloadAction<boolean>) => {
      state.saveTab = action.payload;
    },
    setSavedTabHome: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined || isNaN(action.payload)) {
        return;
      }

      state.savedTab.home = action.payload;
    },
  },
});

export const { setDecimalPlaces, setCurrency, setSavedTabHome, setSaveTab } =
  settingsSlice.actions;
export const selectDecimalPlaces = (state: RootState) =>
  state.settings.decimalPlaces;
export const selectCurrency = (state: RootState) => state.settings.currency;
export const selectSavedTabHome = (state: RootState) =>
  state.settings.savedTab.home;
export const selectSaveTab = (state: RootState) => state.settings.saveTab;

export default settingsSlice.reducer;
