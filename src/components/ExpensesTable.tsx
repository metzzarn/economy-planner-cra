import React from 'react';
import { selectExpenses } from 'redux/economySlice';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { useSelector } from 'react-redux';
import { TableRow } from 'common/table/TableRow';
import { TableItem } from 'common/table/TableItem';
import { formatPrice } from 'utils/numberUtils';

export const ExpensesTable = () => {
  const expenses = useSelector(selectExpenses);

  const rows = () => {
    return expenses.map((expense) => {
      return (
        <TableRow>
          <TableItem>{expense.name}</TableItem>
          <TableItem>{formatPrice(expense.value.toString())}</TableItem>
        </TableRow>
      );
    });
  };

  return (
    <div style={{ width: '700px' }}>
      <Table rows={rows()}>
        <TableHeader>Description</TableHeader>
        <TableHeader width={'20%'}>Amount</TableHeader>
      </Table>
    </div>
  );
};
