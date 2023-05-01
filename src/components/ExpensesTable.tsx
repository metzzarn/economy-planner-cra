import React from 'react';
import {
  addExpense,
  editExpensesTitle,
  removeExpense,
  selectExpenses,
  selectExpensesTitle,
  updateExpense,
} from 'redux/expensesSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinanceTable } from 'components/FinanceTable';
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from '@ark-ui/react';
import { FinancialEntryForm } from 'components/FinancialEntryForm';

export const ExpensesTable = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpenses);
  const title = useAppSelector(selectExpensesTitle) || 'Expenses';

  return (
    <div>
      <h2>
        <Editable
          name={'expensesTitle'}
          placeholder={title}
          defaultValue={title}
          onSubmit={(value) => editExpensesTitle(value.value)}
          maxLength={25}
          selectOnFocus={false}
        >
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
        </Editable>
      </h2>
      <FinancialEntryForm
        action={(name, value, description) =>
          dispatch(addExpense({ name, value, description }))
        }
        namePlaceholder={'Rent'}
        descriptionPlaceholder={'E-faktura'}
        buttonText={'Add expense'}
      />
      <FinanceTable
        data={expenses}
        updateRow={(id, name, amount, description) => {
          dispatch(
            updateExpense({
              index: id,
              name: name,
              value: amount,
              description: description,
            })
          );
        }}
        removeRow={(index) => dispatch(removeExpense(Number(index)))}
      />
    </div>
  );
};
