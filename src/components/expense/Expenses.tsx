import React from 'react';
import {
  addExpense,
  editExpensesDescription,
  editExpensesTitle,
  RedoAction,
  removeExpense,
  selectCanRedo,
  selectCanUndo,
  selectExpenses,
  selectExpensesDescription,
  selectExpensesTitle,
  UndoAction,
  updateExpense,
} from 'redux/expensesSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinanceTable } from 'components/common/FinanceTable';
import { FinancialEntryForm } from 'components/common/FinancialEntryForm';
import { convertToNumber } from 'utils/numberUtils';
import { EditableText } from 'components/common/EditableText';
import { UndoRedo } from 'components/common/UndoRedo';
import { Box, Collapse, FormControlLabel, Switch } from '@mui/material';

export const Expenses = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpenses);
  const title = useAppSelector(selectExpensesTitle) || 'Expenses';
  const description = useAppSelector(selectExpensesDescription);
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
          action={(value) => dispatch(editExpensesTitle(value))}
        />
      </h2>
      <EditableText
        text={description}
        action={(value) => dispatch(editExpensesDescription(value))}
        multiline={true}
        placeholder={'Description'}
        fontSize={'1rem'}
        fontWeight={400}
      />
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
