import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ExpenseEntry, ExpensesState } from 'redux/common';
import undoable from 'redux/undoable';

const initialState: ExpensesState = {
  title: 'Expenses',
  description: '',
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseEntry>) => {
      action.payload.index = state.expenses.length;
      state.expenses.push({
        name: action.payload.name,
        value: action.payload.value,
        description: action.payload.description,
        priority: action.payload.priority,
      });
    },
    updateExpense: (state, action: PayloadAction<ExpenseEntry>) => {
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
        priority: action.payload.priority,
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
    editExpensesDescription: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        description: action.payload,
      };
    },
  },
});

export const UndoAction = {
  type: 'UNDO-' + expensesSlice.name.toUpperCase(),
};

export const RedoAction = {
  type: 'REDO-' + expensesSlice.name.toUpperCase(),
};
export const selectCanUndo = (state: RootState) =>
  state.expenses.past.length > 0;
export const selectCanRedo = (state: RootState) =>
  state.expenses.future.length > 0;

export const {
  addExpense,
  updateExpense,
  removeExpense,
  editExpensesTitle,
  editExpensesDescription,
} = expensesSlice.actions;
export const selectExpenses = (state: RootState) =>
  state.expenses.present.expenses;
export const selectExpensesTitle = (state: RootState) =>
  state.expenses.present.title;
export const selectExpensesDescription = (state: RootState) =>
  state.expenses.present.description;

export default undoable(expensesSlice.reducer, UndoAction, RedoAction);
