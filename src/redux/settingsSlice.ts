import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: {
  decimalPlaces: number;
  currency: Currency;
  currentTab: {
    home: number;
  };
} = {
  decimalPlaces: 2,
  currency: {
    currency: 'SEK',
    locale: 'sv-SE',
  },
  currentTab: {
    home: 0,
  },
};

export interface Currency {
  currency: string;
  locale: string;
}

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

export default settingsSlice.reducer;
