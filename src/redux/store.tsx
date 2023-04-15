import { configureStore } from '@reduxjs/toolkit';
import economyReducer from 'redux/expensesSlice';
import incomeReducer from 'redux/incomeSlice';
import savingsReducer from 'redux/savingsSlice';

const store = configureStore({
  reducer: {
    expenses: economyReducer,
    income: incomeReducer,
    savings: savingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
