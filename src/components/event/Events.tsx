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
  selectEvents,
  selectEventTitle,
  UndoAction,
  updateEventStatus,
} from 'redux/eventSlice';
import { UndoRedo } from 'components/common/UndoRedo';
import { EventTable } from 'components/event/EventTable';
import { EventEntry } from 'redux/common';
import { EventStatus } from 'components/event/EventStatus';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Events = () => {
  const dispatch = useAppDispatch();

  const title = useAppSelector(selectEventTitle) || 'Events';
  const canUndo = useAppSelector(selectCanUndo);
  const canRedo = useAppSelector(selectCanRedo);
  const events = useAppSelector(selectEvents);
  const { t } = useTranslation();

  const createdEvents = events.filter(
    (event: EventEntry) => EventStatus.CREATED === event.status,
  );
  const completedEvents = events.filter(
    (event: EventEntry) => EventStatus.COMPLETE === event.status,
  );

  return (
    <div>
      <h2>
        <EditableText
          text={title}
          action={(value) => dispatch(editEventTitle(value))}
        />
      </h2>

      <Box sx={{ display: 'flex' }}>
        <EventEntryForm
          action={(title, description) =>
            dispatch(addEvent({ title, description }))
          }
        />
      </Box>
      <UndoRedo
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={() => dispatch(UndoAction)}
        onRedo={() => dispatch(RedoAction)}
      />
      <h3>{t('Created')}</h3>
      <EventTable
        events={createdEvents}
        removeRow={(id) => dispatch(removeEvent(id))}
        updateStatus={(id) =>
          dispatch(
            updateEventStatus({
              id: id,
              status: EventStatus.COMPLETE,
            }),
          )
        }
      />
      <h3>{t('Completed')}</h3>
      <EventTable
        events={completedEvents}
        removeRow={(id) => dispatch(removeEvent(id))}
        updateStatus={(id) =>
          dispatch(
            updateEventStatus({
              id: id,
              status: EventStatus.CREATED,
            }),
          )
        }
      />
    </div>
  );
};
