import { configureStore } from "@reduxjs/toolkit";
import salaryReducer from "./salarySlice";

export default configureStore({
  reducer: { salaryReducer: salaryReducer },
});
