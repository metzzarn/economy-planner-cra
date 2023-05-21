import { Action } from '@reduxjs/toolkit';

const undoable = (reducer: any, undoAction: Action, redoAction: Action) => {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  return function (state = initialState, action: any) {
    const { past, present, future } = state;

    switch (action.type) {
      case undoAction.type:
        if (past.length === 0) {
          return state;
        }

        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      case redoAction.type:
        if (future.length === 0) {
          return state;
        }

        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      default:
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        };
    }
  };
};

export default undoable;
