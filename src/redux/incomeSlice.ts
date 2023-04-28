import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { SortOrder } from 'common/SortOrder';
import { arraySortByValue } from 'utils/arraySort';

const initialState: IncomeState = {
  incomeList: [],
  selectedIncome: 0,
  sortOrder: SortOrder.Descending,
};

interface IncomeState {
  incomeList: IncomeEntry[];
  selectedIncome: number;
  sortOrder: SortOrder;
}
export interface IncomeEntry {
  index?: number;
  value: number;
}

export const incomeSlice = createSlice({
  name: 'income',
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
    sortIncomesByValue: (state, action: PayloadAction<SortOrder>) => {
      const newArray = arraySortByValue([...state.incomeList], action.payload);

      return {
        ...state,
        incomeList: newArray,
        sortOrder: action.payload,
      };
    },
  },
});

export const {
  setSelectedIncome,
  addIncome,
  removeIncome,
  sortIncomesByValue,
} = incomeSlice.actions;
export const selectIncome = (state: RootState) => state.income.selectedIncome;
export const selectIncomeList = (state: RootState) => state.income.incomeList;
export const selectIncomeSortOrder = (state: RootState) =>
  state.income.sortOrder;

export default incomeSlice.reducer;
