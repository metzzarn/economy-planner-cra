import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FinancialEntry } from 'redux/common';

const initialState: SavingsState = {
  savings: [],
};

interface SavingsState {
  savings: FinancialEntry[];
}

export const economySlice = createSlice({
  name: 'economy',
  initialState,
  reducers: {
    addSaving: (state, action: PayloadAction<FinancialEntry>) => {
      state.savings.push(action.payload);
    },
    updateSaving: (state, action: PayloadAction<FinancialEntry>) => {
      if (action.payload.index === undefined || isNaN(action.payload.value)) {
        return;
      }

      const newArray = [...state.savings];

      newArray[action.payload.index] = {
        name: action.payload.name,
        value: +action.payload.value,
        description: action.payload.description,
      };

      return {
        ...state,
        savings: newArray,
      };
    },
    removeSaving: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined) {
        return;
      }

      const newArray = [...state.savings];

      newArray.splice(action.payload, 1);

      return {
        ...state,
        savings: newArray,
      };
    },
  },
});

export const { addSaving, updateSaving, removeSaving } = economySlice.actions;
export const selectSavings = (state: RootState) => state.savings.savings;

export default economySlice.reducer;
