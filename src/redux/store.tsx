import { configureStore } from '@reduxjs/toolkit';
import economyReducer from 'redux/expensesSlice';
import salaryReducer from 'redux/salarySlice';
import savingsReducer from 'redux/savingsSlice';

const store = configureStore({
  reducer: {
    expenses: economyReducer,
    salary: salaryReducer,
    savings: savingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
