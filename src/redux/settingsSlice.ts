import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: {
  decimalPlaces: number;
  currency: Currency;
} = {
  decimalPlaces: 2,
  currency: {
    currency: 'SEK',
    locale: 'sv-SE',
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
      if (!action.payload === undefined) {
        return;
      }

      state.currency = action.payload;
    },
  },
});

export const { setDecimalPlaces, setCurrency } = settingsSlice.actions;
export const selectDecimalPlaces = (state: RootState) =>
  state.settings.decimalPlaces;
export const selectCurrency = (state: RootState) => state.settings.currency;

export default settingsSlice.reducer;
