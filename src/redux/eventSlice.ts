import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { EventEntry, EventState } from 'redux/common';
import undoable from 'redux/undoable';

const initialState: EventState = {
  title: 'Event',
  events: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventEntry>) => {
      action.payload.index = state.events.length;
      state.events.push({
        title: action.payload.title,
        description: action.payload.description,
        status: EventStatus.CREATED,
      });
    },
    updateEvent: (state, action: PayloadAction<EventEntry>) => {
      if (action.payload.index === undefined || !action.payload.title) {
        return;
      }

      const newArray = [...state.events];

      newArray[action.payload.index] = {
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status,
      };

      return {
        ...state,
        events: newArray,
      };
    },
    removeEvent: (state, action: PayloadAction<number>) => {
      if (action.payload === undefined) {
        return;
      }

      const newArray = [...state.events];

      newArray.splice(action.payload, 1);

      return {
        ...state,
        events: newArray,
      };
    },
    editEventTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
  },
});

export const UndoAction = {
  type: 'UNDO-' + eventSlice.name.toUpperCase(),
};

export const RedoAction = {
  type: 'REDO-' + eventSlice.name.toUpperCase(),
};
export const selectCanUndo = (state: RootState) => state.events.past.length > 0;
export const selectCanRedo = (state: RootState) =>
  state.events.future.length > 0;

export const { addEvent, updateEvent, removeEvent, editEventTitle } =
  eventSlice.actions;
export const selectEvents = (state: RootState) => state.events.present.events;
export const selectEventTitle = (state: RootState) =>
  state.events.present.title;

export default undoable(eventSlice.reducer, UndoAction, RedoAction);
