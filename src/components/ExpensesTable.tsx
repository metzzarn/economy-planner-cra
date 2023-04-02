import React from 'react';
import { selectExpenses } from 'redux/economySlice';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { useSelector } from 'react-redux';
import { TableRow } from 'common/table/TableRow';
import { TableRowItem } from 'common/table/TableRowItem';
import { formatPrice } from 'utils/numberUtils';
import { TableFooter } from 'common/table/TableFooter';
import { TableFooterItem } from 'common/table/TableFooterItem';

export const ExpensesTable = () => {
  const expenses = useSelector(selectExpenses);

  const rows = () => {
    return expenses.map((expense) => {
      return (
        <TableRow>
          <TableRowItem>{expense.name}</TableRowItem>
          <TableRowItem>{formatPrice(expense.value.toString())}</TableRowItem>
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
          {expenses.reduce((acc, curr) => acc + curr.value, 0)}
        </TableFooterItem>
      </TableFooter>
    );
  };

  return (
    <div style={{ width: '700px' }}>
      <Table rows={rows()} footer={footer()}>
        <TableHeader>Description</TableHeader>
        <TableHeader width={'20%'}>Amount</TableHeader>
      </Table>
    </div>
  );
};
