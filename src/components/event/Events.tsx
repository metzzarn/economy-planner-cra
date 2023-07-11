import { EventEntryForm } from 'components/event/EventEntryForm';
import { addIncome } from 'redux/incomeSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { EditableText } from 'components/common/EditableText';
import {
  editEventTitle,
  RedoAction,
  selectCanRedo,
  selectCanUndo,
  selectEventDescription,
  selectEvents,
  selectEventTitle,
  UndoAction,
} from 'redux/eventSlice';
import { UndoRedo } from 'components/common/UndoRedo';

export const Events = () => {
  const dispatch = useAppDispatch();

  const events = useAppSelector(selectEvents);
  const title = useAppSelector(selectEventTitle) || 'Events';
  const description = useAppSelector(selectEventDescription);
  const canUndo = useAppSelector(selectCanUndo);
  const canRedo = useAppSelector(selectCanRedo);

  return (
    <div>
      <h2>
        <EditableText
          text={title}
          action={(value) => dispatch(editEventTitle(value))}
        />
      </h2>

      <EventEntryForm
        action={(value, tax) => dispatch(addIncome({ value, tax }))}
        titlePlaceholder={'Travel to Australia'}
        descriptionPlaceholder={'Eat at restaurants'}
        buttonText={'Add event'}
      />
      <UndoRedo
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={() => dispatch(UndoAction)}
        onRedo={() => dispatch(RedoAction)}
      />
    </div>
  );
};
