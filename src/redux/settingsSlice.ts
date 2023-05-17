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
  currentTab: {
    home: 0,
  },
};

export const settingsSlice = createSlice({
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
    setCurrentTabHome: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined || isNaN(action.payload)) {
        return;
      }

      state.currentTab.home = action.payload;
    },
  },
});

export const { setDecimalPlaces, setCurrency, setCurrentTabHome } =
  settingsSlice.actions;
export const selectDecimalPlaces = (state: RootState) =>
  state.settings.decimalPlaces;
export const selectCurrency = (state: RootState) => state.settings.currency;
export const selectCurrentTabHome = (state: RootState) =>
  state.settings.currentTab.home;
export const selectSaveTab = (state: RootState) => state.settings.saveTab;

export default settingsSlice.reducer;
