import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: SalaryState = {
  salary: {
    value: 0,
  },
};

interface SalaryState {
  salary: {
    value: number;
  };
}

export const salarySlice = createSlice({
  name: 'economy',
  initialState,
  reducers: {
    setIncome: (state, action: PayloadAction<number>) => {
      state.salary.value = action.payload;
    },
  },
});

export const { setIncome } = salarySlice.actions;
export const selectSalary = (state: RootState) => state.salary.salary.value;

export default salarySlice.reducer;
