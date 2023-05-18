import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ExpensesState, FinancialEntry } from 'redux/common';

const initialState: ExpensesState = {
  title: 'Expenses',
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'economy',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<FinancialEntry>) => {
      action.payload.index = state.expenses.length;
      state.expenses.push({
        name: action.payload.name,
        value: action.payload.value,
        description: action.payload.description,
      });
    },
    updateExpense: (state, action: PayloadAction<FinancialEntry>) => {
      if (
        action.payload.index === undefined ||
        !action.payload.value ||
        isNaN(action.payload.value)
      ) {
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
    editExpensesTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
  },
});

export const { addExpense, updateExpense, removeExpense, editExpensesTitle } =
  expensesSlice.actions;
export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectExpensesTitle = (state: RootState) => state.expenses.title;

export default expensesSlice.reducer;
