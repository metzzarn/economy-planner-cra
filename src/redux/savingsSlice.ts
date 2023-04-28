import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FinancialEntry } from 'redux/common';
import { SortOrder } from 'common/SortOrder';
import { arraySortByName, arraySortByValue } from 'utils/arraySort';

const initialState: SavingsState = {
  title: 'Savings',
  savings: [],
  sortOrder: SortOrder.Descending,
  sortColumn: 'name',
};

interface SavingsState {
  title: string;
  savings: FinancialEntry[];
  sortOrder?: SortOrder;
  sortColumn?: string;
}

export const savingsSlice = createSlice({
  name: 'savings',
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
    sortSavingsByName: (state, action: PayloadAction<SortOrder>) => {
      const newArray = arraySortByName([...state.savings], action.payload);

      return {
        ...state,
        savings: newArray,
        sortOrder: action.payload,
      };
    },
    sortSavingsByValue: (state, action: PayloadAction<SortOrder>) => {
      const newArray = arraySortByValue([...state.savings], action.payload);

      return {
        ...state,
        savings: newArray,
        sortOrder: action.payload,
      };
    },
  },
});

export const {
  addSaving,
  updateSaving,
  removeSaving,
  editSavingsTitle,
  sortSavingsByName,
  sortSavingsByValue,
} = savingsSlice.actions;
export const selectSavings = (state: RootState) => state.savings.savings;
export const selectSavingsTitle = (state: RootState) => state.savings.title;
export const selectSavingsSortOrder = (state: RootState) =>
  state.savings.sortOrder;

export default savingsSlice.reducer;
