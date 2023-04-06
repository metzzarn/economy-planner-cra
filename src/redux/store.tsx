import { configureStore } from '@reduxjs/toolkit';
import economyReducer from 'redux/economySlice';

const store = configureStore({
  reducer: { economy: economyReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
