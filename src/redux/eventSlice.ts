import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { EventEntry, EventState } from 'redux/common';
import undoable from 'redux/undoable';
import { EventStatus } from 'components/event/EventStatus';
import { v4 as uuidv4 } from 'uuid';

const initialState: EventState = {
  title: 'Event',
  events: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventEntry>) => {
      state.events.push({
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        status: EventStatus.CREATED,
      });
    },
    updateEvent: (state, action: PayloadAction<EventEntry>) => {
      if (action.payload.id === undefined || !action.payload.title) {
        return;
      }

      const newArray = [...state.events];
      const currentEvent = newArray.filter(
        (event) => event.id === action.payload.id,
      )[0];

      const eventIndex = state.events.findIndex(
        (event) => event.id === action.payload.id,
      );
      newArray[eventIndex] = {
        ...currentEvent,
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status
          ? action.payload.status
          : currentEvent.status,
      };

      return {
        ...state,
        events: newArray,
      };
    },
    updateEventStatus: (state, action: PayloadAction<EventEntry>) => {
      if (action.payload.id === undefined || !action.payload.status) {
        return;
      }

      const newArray = [...state.events];
      const currentEvent = newArray.filter(
        (event) => event.id === action.payload.id,
      )[0];
      const eventIndex = state.events.findIndex(
        (event) => event.id === action.payload.id,
      );
      newArray[eventIndex] = {
        ...currentEvent,
        status: action.payload.status,
      };

      return {
        ...state,
        events: newArray,
      };
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      if (action.payload === undefined) {
        return;
      }

      const newArray = [...state.events];
      const filteredArray = newArray.filter(
        (event) => event.id !== action.payload,
      );

      return {
        ...state,
        events: filteredArray,
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

export const {
  addEvent,
  updateEvent,
  updateEventStatus,
  removeEvent,
  editEventTitle,
} = eventSlice.actions;
export const selectEvents = (state: RootState) => state.events.present.events;
export const selectEventTitle = (state: RootState) =>
  state.events.present.title;

export default undoable(eventSlice.reducer, UndoAction, RedoAction);
