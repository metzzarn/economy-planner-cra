import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: IncomeState = {
  decimalPlaces: 2,
};
interface IncomeState {
  decimalPlaces: number;
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDecimalPlaces: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined && Number.isInteger(action.payload)) {
        return;
      }

      state.decimalPlaces = action.payload;
    },
  },
});

export const { setDecimalPlaces } = settingsSlice.actions;
export const selectDecimalPlaces = (state: RootState) =>
  state.settings.decimalPlaces;

export default settingsSlice.reducer;
