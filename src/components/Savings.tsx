import React from 'react';
import {
  addSaving,
  editSavingsTitle,
  RedoAction,
  removeSaving,
  selectCanRedo,
  selectCanUndo,
  selectSavings,
  selectSavingsTitle,
  UndoAction,
  updateSaving,
} from 'redux/savingsSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinanceTable } from 'components/FinanceTable';
import { FinancialEntryForm } from 'components/FinancialEntryForm';
import { convertToNumber } from 'utils/numberUtils';
import { EditableText } from 'common/EditableText';
import { UndoRedo } from 'components/UndoRedo';
import { Box, Collapse, FormControlLabel, Switch } from '@mui/material';

export const Savings = () => {
  const dispatch = useAppDispatch();
  const savings = useAppSelector(selectSavings);
  const title = useAppSelector(selectSavingsTitle) || 'Savings';
  const canUndo = useAppSelector(selectCanUndo);
  const canRedo = useAppSelector(selectCanRedo);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      <h2>
        <EditableText
          title={title}
          action={(value) => dispatch(editSavingsTitle(value))}
        />
      </h2>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label={'Add savings'}
      />
      <Box sx={{ display: 'flex' }}>
        <Collapse in={checked}>
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
            })
          );
        }}
        removeRow={(index) => dispatch(removeSaving(Number(index)))}
      />
    </div>
  );
};
