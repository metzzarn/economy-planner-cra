import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { IncomeEntry, IncomeState } from 'redux/common';

const initialState: IncomeState = {
  incomeList: [],
  selectedIncome: -1,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setSelectedIncome: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined) {
        return;
      }

      state.selectedIncome = action.payload;
    },
    addIncome: (state, action: PayloadAction<IncomeEntry>) => {
      state.incomeList.push(action.payload);
      if (state.selectedIncome === -1) {
        state.selectedIncome = state.incomeList.length - 1;
      }
    },
    removeIncome: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined) {
        return;
      }

      const newIncomeList = [...state.incomeList];
      const deletedIncome = newIncomeList.splice(action.payload, 1);

      const nextInList = newIncomeList[action.payload];
      const newSelectedIncome = nextInList
        ? action.payload
        : action.payload - 1;

      const shouldChangeSelectedIncome =
        deletedIncome[0].value === state.incomeList[state.selectedIncome].value;

      return {
        ...state,
        incomeList: newIncomeList,
        selectedIncome: shouldChangeSelectedIncome
          ? newSelectedIncome
          : state.selectedIncome,
      };
    },
  },
});

export const { setSelectedIncome, addIncome, removeIncome } =
  incomeSlice.actions;
export const selectIncome = (state: RootState) =>
  state.income.incomeList[state.income.selectedIncome];
export const selectIncomeList = (state: RootState) => state.income.incomeList;

export default incomeSlice.reducer;
