import { useSelector } from 'react-redux';
import { selectExpenses, selectSalary } from 'redux/economySlice';
import { SalaryForm } from './SalaryForm';
import React from 'react';
import { ExpensesForm } from './ExpensesForm';
import { formatPrice } from 'utils/numberUtils';
import { Table } from 'common/table/Table';
import { TableRow } from 'common/table/TableRow';
import { TableItem } from 'common/table/TableItem';
import { TableHeader } from 'common/table/TableHeader';

export const Home = () => {
  const salary = useSelector(selectSalary);
  const expenses = useSelector(selectExpenses);

  const expensesString = expenses.map((expense) => expense.value);

  const rows = () => {
    return expenses.map((expense) => {
      return (
        <TableRow>
          <TableItem>{expense.name}</TableItem>
          <TableItem>{expense.value}</TableItem>
        </TableRow>
      );
    });
  };

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatPrice(salary.toString())}`}
        <SalaryForm />
      </div>
      <div>
        <ExpensesForm />
      </div>
      <div style={{ width: '700px' }}>
        <Table rows={rows()}>
          <TableHeader>Description</TableHeader>
          <TableHeader width={'20%'}>Amount</TableHeader>
        </Table>
      </div>
    </div>
  );
};
