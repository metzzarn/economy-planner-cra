import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import economyReducer from 'redux/expensesSlice';
import incomeReducer from 'redux/incomeSlice';
import savingsReducer from 'redux/savingsSlice';
import { STATE_LOCAL_STORAGE_KEY } from 'utils/constants';
import { loadStateFromLocalStorage } from 'utils/stateUtils';

const combinedReducer = combineReducers({
  expenses: economyReducer,
  income: incomeReducer,
  savings: savingsReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'LOAD_STATE') {
    return action.payload;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
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
