import { createSlice } from "@reduxjs/toolkit";

export const salarySlice = createSlice({
  name: "salary",
  initialState: {
    value: 0.0,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = salarySlice.actions;

export default salarySlice.reducer;
