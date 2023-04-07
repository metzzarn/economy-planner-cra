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
}

export const economySlice = createSlice({
  name: 'economy',
  initialState,
  reducers: {
    setIncome: (state, action: PayloadAction<number>) => {
      state.salary.value = action.payload;
    },
    addExpense: (state, action: PayloadAction<FinancialEntry>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<FinancialEntry>) => {
      const newArray = [...state.expenses];

      if (action.payload.index === undefined || isNaN(action.payload.value)) {
        return;
      }

      newArray[action.payload.index] = {
        name: action.payload.name,
        value: +action.payload.value,
      };

      return {
        ...state,
        expenses: newArray,
      };
    },
    addSaving: (state, action: PayloadAction<FinancialEntry>) => {
      state.savings.push(action.payload);
    },
    updateSaving: (state, action: PayloadAction<FinancialEntry>) => {
      const newArray = [...state.savings];

      if (action.payload.index === undefined || isNaN(action.payload.value)) {
        return;
      }

      newArray[action.payload.index] = {
        name: action.payload.name,
        value: +action.payload.value,
      };

      return {
        ...state,
        savings: newArray,
      };
    },
  },
});

export const { setIncome, addExpense, updateExpense, addSaving, updateSaving } =
  economySlice.actions;
export const selectSalary = (state: RootState) => state.economy.salary.value;
export const selectExpenses = (state: RootState) => state.economy.expenses;
export const selectSavings = (state: RootState) => state.economy.savings;

export default economySlice.reducer;
