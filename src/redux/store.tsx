import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { legacy_createStore as createStore } from 'redux';
import expensesReducer from 'redux/expensesSlice';
import incomeReducer from 'redux/incomeSlice';
import savingsReducer from 'redux/savingsSlice';
import settingsReducer from 'redux/settingsSlice';
import { loadStateFromLocalStorage } from 'utils/stateUtils';
import { STATE_LOCAL_STORAGE_KEY, STATE_VERSION } from 'utils/constants';

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
    if (action.payload.version === STATE_VERSION) {
      delete action.payload.version;
      return action.payload;
    } else {
      console.error(
        `The version of the state (${action.payload.version}) does not match the current version (${STATE_VERSION}).`
      );
    }
  }

  if (action.type === 'RESET_STATE') {
    return combinedReducer(undefined, action);
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadStateFromLocalStorage(
    createStore(rootReducer).getState()
  ),
});

store.subscribe(() => {
  localStorage.setItem(
    STATE_LOCAL_STORAGE_KEY,
    JSON.stringify(store.getState())
  );
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
