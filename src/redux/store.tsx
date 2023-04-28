import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import expensesReducer from 'redux/expensesSlice';
import incomeReducer from 'redux/incomeSlice';
import savingsReducer from 'redux/savingsSlice';
import settingsReducer from 'redux/settingsSlice';
import { loadStateFromLocalStorage } from 'utils/stateUtils';
import { STATE_LOCAL_STORAGE_KEY } from 'utils/constants';

const combinedReducer = combineReducers({
  expenses: expensesReducer,
  income: incomeReducer,
  savings: savingsReducer,
  settings: settingsReducer,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === 'LOAD_STATE') {
    return action.payload;
  }
  if (action.type === 'RESET_STATE') {
    return combinedReducer(undefined, action);
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
