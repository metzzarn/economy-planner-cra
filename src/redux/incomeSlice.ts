import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: IncomeState = {
  incomeList: [],
  selectedIncome: 0,
};

interface IncomeState {
  incomeList: IncomeEntry[];
  selectedIncome: number;
}
export interface IncomeEntry {
  index?: number;
  value: number;
}

export const incomeSlice = createSlice({
  name: 'economy',
  initialState,
  reducers: {
    setSelectedIncome: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined) {
        return;
      }

      state.selectedIncome = state.incomeList[action.payload].value;
    },
    addIncome: (state, action: PayloadAction<IncomeEntry>) => {
      state.incomeList.push(action.payload);
    },
  },
});

export const { setSelectedIncome, addIncome } = incomeSlice.actions;
export const selectIncome = (state: RootState) => state.income.selectedIncome;
export const selectIncomeList = (state: RootState) => state.income.incomeList;

export default incomeSlice.reducer;
