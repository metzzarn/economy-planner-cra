import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FinancialEntry } from 'redux/common';
import { SortOrder } from 'common/SortOrder';
import { arraySortByName, arraySortByValue } from 'utils/arraySort';

const initialState: ExpensesState = {
  title: 'Expenses',
  expenses: [],
  sortOrder: SortOrder.Descending,
};

interface ExpensesState {
  title: string;
  expenses: FinancialEntry[];
  sortOrder?: SortOrder;
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
    editExpensesTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
    sortExpensesByName: (state, action: PayloadAction<SortOrder>) => {
      const newArray = arraySortByName([...state.expenses], action.payload);

      return {
        ...state,
        expenses: newArray,
        sortOrder: action.payload,
      };
    },
    sortExpensesByValue: (state, action: PayloadAction<SortOrder>) => {
      const newArray = arraySortByValue([...state.expenses], action.payload);

      return {
        ...state,
        expenses: newArray,
        sortOrder: action.payload,
      };
    },
  },
});

export const {
  addExpense,
  updateExpense,
  removeExpense,
  editExpensesTitle,
  sortExpensesByName,
  sortExpensesByValue,
} = expensesSlice.actions;
export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectExpensesTitle = (state: RootState) => state.expenses.title;
export const selectExpensesSortOrder = (state: RootState) =>
  state.expenses.sortOrder;

export default expensesSlice.reducer;
