import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FinancialEntry } from 'redux/common';

const initialState: SavingsState = {
  title: 'Savings',
  savings: [],
};

interface SavingsState {
  title: string;
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
    editSavingsTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
  },
});

export const { addSaving, updateSaving, removeSaving, editSavingsTitle } =
  economySlice.actions;
export const selectSavings = (state: RootState) => state.savings.savings;
export const selectSavingsTitle = (state: RootState) => state.savings.title;

export default economySlice.reducer;
