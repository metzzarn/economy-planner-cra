import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Expense {
  name: string;
  value: number;
}

interface EconomyState {
  salary: {
    value: number;
  };
  expenses: Expense[];
}

const initialState: EconomyState = {
  salary: {
    value: 0,
  },
  expenses: [],
};

export const economySlice = createSlice({
  name: "economy",
  initialState,
  reducers: {
    setIncome: (state, action: PayloadAction<number>) => {
      state.salary.value = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
  },
});

export const { setIncome, addExpense } = economySlice.actions;
export const selectSalary = (state: RootState) => state.economy.salary.value;
export const selectExpenses = (state: RootState) => state.economy.expenses;

export default economySlice.reducer;
