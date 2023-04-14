import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FinancialEntry } from 'redux/common';

const initialState: ExpensesState = {
  expenses: [],
};

interface ExpensesState {
  expenses: FinancialEntry[];
}

export const expensesSlice = createSlice({
  name: 'economy',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<FinancialEntry>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<FinancialEntry>) => {
      if (action.payload.index === undefined || isNaN(action.payload.value)) {
        return;
      }

      const newArray = [...state.expenses];

      newArray[action.payload.index] = {
        name: action.payload.name,
        value: +action.payload.value,
        description: action.payload.description,
      };

      return {
        ...state,
        expenses: newArray,
      };
    },
    removeExpense: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined) {
        return;
      }

      const newArray = [...state.expenses];

      newArray.splice(action.payload, 1);

      return {
        ...state,
        expenses: newArray,
      };
    },
  },
});

export const { addExpense, updateExpense, removeExpense } =
  expensesSlice.actions;
export const selectExpenses = (state: RootState) => state.expenses.expenses;

export default expensesSlice.reducer;
