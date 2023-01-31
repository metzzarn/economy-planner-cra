import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface SalaryState {
  value: number;
}

const initialState: SalaryState = {
  value: 0,
};

export const salarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = salarySlice.actions;
export const selectSalary = (state: RootState) => state.salary.value;

export default salarySlice.reducer;
