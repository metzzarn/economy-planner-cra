import { configureStore } from '@reduxjs/toolkit';
import economyReducer from 'redux/expensesSlice';
import incomeReducer from 'redux/incomeSlice';
import savingsReducer from 'redux/savingsSlice';
import { STATE_LOCAL_STORAGE_KEY } from 'utils/constants';
import { loadStateFromLocalStorage } from 'utils/stateUtils';

const store = configureStore({
  reducer: {
    expenses: economyReducer,
    income: incomeReducer,
    savings: savingsReducer,
  },
  preloadedState: loadStateFromLocalStorage(),
});

store.subscribe(() => {
  localStorage.setItem(
    STATE_LOCAL_STORAGE_KEY,
    JSON.stringify(store.getState())
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
