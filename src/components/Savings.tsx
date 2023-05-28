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
  const description = useAppSelector(selectSavingsDescription);
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
