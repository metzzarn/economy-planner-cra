import React from 'react';
import {
  editExpensesTitle,
  removeExpense,
  selectExpenses,
  selectExpensesTitle,
  updateExpense,
} from 'redux/expensesSlice';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { TableRow } from 'common/table/TableRow';
import { TableRowItem } from 'common/table/TableRowItem';
import { formatPrice } from 'utils/numberUtils';
import { TableFooter } from 'common/table/TableFooter';
import { TableFooterItem } from 'common/table/TableFooterItem';
import { If } from 'common/If';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinancialEntry } from 'redux/common';
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from '@ark-ui/react';

export const ExpensesTable = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpenses);
  const title = useAppSelector(selectExpensesTitle) || 'Expenses';

  const rows = () => {
    return expenses.map((expense: FinancialEntry, index: number) => {
      const updateName = (value: string) => {
        return dispatch(
          updateExpense({
            name: value,
            value: expense.value,
            description: expense.description,
            index,
          })
        );
      };
      const updateValue = (value: number) => {
        return dispatch(
          updateExpense({
            name: expense.name,
            value,
            description: expense.description,
            index,
          })
        );
      };
      const updateDescription = (description: string) => {
        return dispatch(
          updateExpense({
            name: expense.name,
            value: expense.value,
            description: description,
            index,
          })
        );
      };
      return (
        <TableRow key={index}>
          <TableRowItem allowEdit action={updateName} value={expense.name} />
          <TableRowItem
            allowEdit
            action={updateValue}
            value={formatPrice(expense.value.toString())}
          />
          <TableRowItem
            allowEdit
            action={updateDescription}
            value={expense.description}
          />
          <TableRowItem
            style={{ cursor: 'pointer' }}
            value={'X'}
            onClick={() => dispatch(removeExpense(index))}
          />
        </TableRow>
      );
    });
  };

  const footer = () => {
    return (
      <TableFooter>
        <TableFooterItem>
          <span style={{ fontWeight: 'bold' }}>Total</span>
        </TableFooterItem>
        <TableFooterItem>
          {expenses.reduce(
            (acc: number, curr: FinancialEntry) => acc + curr.value,
            0
          )}
        </TableFooterItem>
      </TableFooter>
    );
  };

  return (
    <div style={{ width: '700px' }}>
      <h2>
        <Editable
          name={'expensesTitle'}
          placeholder={title}
          defaultValue={title}
          onSubmit={(value) => dispatch(editExpensesTitle(value.value))}
          maxLength={25}
          selectOnFocus={false}
        >
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
        </Editable>
      </h2>
      <If true={expenses?.length > 0}>
        <Table rows={rows()} footer={footer()}>
          <TableHeader>Name</TableHeader>
          <TableHeader width={'20%'}>Amount</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader width={'5%'}></TableHeader>
        </Table>
      </If>
    </div>
  );
};
