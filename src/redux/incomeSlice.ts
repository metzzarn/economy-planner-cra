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
      if (state.selectedIncome === 0) {
        state.selectedIncome = action.payload.value;
      }
    },
    removeIncome: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined) {
        return;
      }

      const newIncomeList = [...state.incomeList];
      const deletedIncome = newIncomeList.splice(action.payload, 1);

      const newSelectedIncome =
        newIncomeList.length > 0 ? newIncomeList[0].value : 0;

      const shouldChangeSelectedIncome =
        deletedIncome[0].value === state.selectedIncome;

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
export const selectIncome = (state: RootState) => state.income.selectedIncome;
export const selectIncomeList = (state: RootState) => state.income.incomeList;

export default incomeSlice.reducer;
