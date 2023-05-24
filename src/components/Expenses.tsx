import React from 'react';
import {
  addExpense,
  editExpensesTitle,
  RedoAction,
  removeExpense,
  selectCanRedo,
  selectCanUndo,
  selectExpenses,
  selectExpensesTitle,
  UndoAction,
  updateExpense,
} from 'redux/expensesSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinanceTable } from 'components/FinanceTable';
import { FinancialEntryForm } from 'components/FinancialEntryForm';
import { convertToNumber } from 'utils/numberUtils';
import { EditableText } from 'common/EditableText';
import { UndoRedo } from 'components/UndoRedo';
import { Box, Collapse, FormControlLabel, Switch } from '@mui/material';

export const Expenses = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpenses);
  const title = useAppSelector(selectExpensesTitle) || 'Expenses';
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
          action={(value) => dispatch(editExpensesTitle(value))}
        />
      </h2>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label={'Add expenses'}
      />
      <Box sx={{ display: 'flex' }}>
        <Collapse in={checked}>
          <div>
            <FinancialEntryForm
              action={(name, value, description) =>
                dispatch(addExpense({ name, value, description }))
              }
              namePlaceholder={'Rent'}
              descriptionPlaceholder={'E-faktura'}
              buttonText={'Add expense'}
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
        data={expenses}
        updateRow={(id, name, amount, description) => {
          dispatch(
            updateExpense({
              index: id,
              name: name,
              value: convertToNumber(amount),
              description: description,
            })
          );
        }}
        removeRow={(index) => dispatch(removeExpense(Number(index)))}
      />
    </div>
  );
};
