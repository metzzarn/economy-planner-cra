import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: EconomyState = {
  salary: {
    value: 0,
  },
  expenses: [],
  savings: [],
};

interface EconomyState {
  salary: {
    value: number;
  };
  expenses: FinancialEntry[];
  savings: FinancialEntry[];
}

export interface FinancialEntry {
  index?: number;
  name: string;
  value: number;
  description: string;
}

export const economySlice = createSlice({
  name: 'economy',
  initialState,
  reducers: {
    setIncome: (state, action: PayloadAction<number>) => {
      state.salary.value = action.payload;
    },

    // Expenses
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

    // Savings
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

export const {
  setIncome,
  addExpense,
  updateExpense,
  removeExpense,
  addSaving,
  updateSaving,
  removeSaving,
} = economySlice.actions;
export const selectSalary = (state: RootState) => state.economy.salary.value;
export const selectExpenses = (state: RootState) => state.economy.expenses;
export const selectSavings = (state: RootState) => state.economy.savings;

export default economySlice.reducer;
