import React from 'react';
import {
  addSaving,
  editSavingsDescription,
  editSavingsTitle,
  RedoAction,
  removeSaving,
  selectCanRedo,
  selectCanUndo,
  selectSavings,
  selectSavingsDescription,
  selectSavingsTitle,
  UndoAction,
  updateSaving,
} from 'redux/savingsSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinanceTable } from 'components/common/FinanceTable';
import { FinancialEntryForm } from 'components/common/FinancialEntryForm';
import { convertToNumber } from 'utils/numberUtils';
import { EditableText } from 'components/common/EditableText';
import { UndoRedo } from 'components/common/UndoRedo';
import { Box, Collapse, FormControlLabel, Switch } from '@mui/material';
import { SavingsGraphs } from 'components/saving/SavingsGraphs';

export const Savings = () => {
  const dispatch = useAppDispatch();
  const savings = useAppSelector(selectSavings);
  const title = useAppSelector(selectSavingsTitle) || 'Savings';
  const description = useAppSelector(selectSavingsDescription);
  const canUndo = useAppSelector(selectCanUndo);
  const canRedo = useAppSelector(selectCanRedo);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [showGraph, setShowGraph] = React.useState(false);

  const handleShowForm = () => {
    setShowAddForm((prev) => !prev);
  };
  const handleShowGraph = () => {
    setShowGraph((prev) => !prev);
  };

  return (
    <div>
      <h2>
        <EditableText
          text={title}
          action={(value) => dispatch(editSavingsTitle(value))}
        />
      </h2>
      <EditableText
        text={description}
        action={(value) => dispatch(editSavingsDescription(value))}
        multiline={true}
        placeholder={'Description'}
        fontSize={'1rem'}
        fontWeight={400}
      />
      <FormControlLabel
        control={<Switch checked={showGraph} onChange={handleShowGraph} />}
        label={'Show graph'}
      />
      <Collapse in={showGraph}>
        <SavingsGraphs />
      </Collapse>
      <FormControlLabel
        control={<Switch checked={showAddForm} onChange={handleShowForm} />}
        label={'Add savings'}
      />
      <Box sx={{ display: 'flex' }}>
        <Collapse in={showAddForm}>
          <div>
            <FinancialEntryForm
              action={(name, value, description) =>
                dispatch(addSaving({ name, value, description }))
              }
              namePlaceholder={'Car'}
              descriptionPlaceholder={'Autogiro - den 25e'}
              buttonText={'Add saving'}
            />
          </div>
        </Collapse>
      </Box>

      <UndoRedo
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={() => dispatch(UndoAction)}
        onRedo={() => dispatch(RedoAction)}
      />
      <FinanceTable
        data={savings}
        updateRow={(id, name, amount, description) => {
          dispatch(
            updateSaving({
              index: id,
              name: name,
              value: convertToNumber(amount),
              description: description,
            }),
          );
        }}
        removeRow={(index) => dispatch(removeSaving(Number(index)))}
      />
    </div>
  );
};
