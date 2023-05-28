import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FinancialEntry, SavingsState } from 'redux/common';
import undoable from 'redux/undoable';

const initialState: SavingsState = {
  title: 'Savings',
  description: '',
  savings: [],
};

const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    addSaving: (state, action: PayloadAction<FinancialEntry>) => {
      state.savings.push({
        name: action.payload.name,
        value: action.payload.value,
        description: action.payload.description,
      });
    },
    updateSaving: (state, action: PayloadAction<FinancialEntry>) => {
      if (
        action.payload.index === undefined ||
        !action.payload.value ||
        isNaN(action.payload.value)
      ) {
        return;
      }

      const newArray = [...state.savings];

      newArray[action.payload.index] = {
        name: action.payload.name,
        value: +action.payload.value,
        description: action.payload.description,
      };

      return {
        ...state,
        savings: newArray,
      };
    },
    removeSaving: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined) {
        return;
      }

      const newArray = [...state.savings];

      newArray.splice(action.payload, 1);

      return {
        ...state,
        savings: newArray,
      };
    },
    editSavingsTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
    editSavingsDescription: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        description: action.payload,
      };
    },
  },
});

export const UndoAction = {
  type: 'UNDO-' + savingsSlice.name.toUpperCase(),
};

export const RedoAction = {
  type: 'REDO-' + savingsSlice.name.toUpperCase(),
};

export const selectCanUndo = (state: RootState) =>
  state.savings.past.length > 0;
export const selectCanRedo = (state: RootState) =>
  state.savings.future.length > 0;

export const {
  addSaving,
  updateSaving,
  removeSaving,
  editSavingsTitle,
  editSavingsDescription,
} = savingsSlice.actions;
export const selectSavings = (state: RootState) =>
  state.savings.present.savings;
export const selectSavingsTitle = (state: RootState) =>
  state.savings.present.title;
export const selectSavingsDescription = (state: RootState) =>
  state.savings.present.description;

export default undoable(savingsSlice.reducer, UndoAction, RedoAction);
