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
import { FinancialEntryForm } from 'components/FinancialEntryForm';
import { convertToNumber } from 'utils/numberUtils';
import { EditableText } from 'common/EditableText';

export const ExpensesTable = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpenses);
  const title = useAppSelector(selectExpensesTitle) || 'Expenses';

  return (
    <div>
      <h2>
        <EditableText
          title={title}
          action={(value) => dispatch(editExpensesTitle(value))}
        />
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
