import { EventEntryForm } from 'components/event/EventEntryForm';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { EditableText } from 'components/common/EditableText';
import {
  addEvent,
  editEventTitle,
  RedoAction,
  removeEvent,
  selectCanRedo,
  selectCanUndo,
  selectEventTitle,
  UndoAction,
} from 'redux/eventSlice';
import { UndoRedo } from 'components/common/UndoRedo';
import { EventTable } from 'components/event/EventTable';

export const Events = () => {
  const dispatch = useAppDispatch();

  const title = useAppSelector(selectEventTitle) || 'Events';
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
        action={(title, description) =>
          dispatch(addEvent({ title, description }))
        }
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
      <EventTable removeRow={(index) => dispatch(removeEvent(Number(index)))} />
    </div>
  );
};
