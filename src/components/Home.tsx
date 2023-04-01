import { useSelector } from 'react-redux';
import { selectExpenses, selectSalary } from 'redux/economySlice';
import { SalaryForm } from './SalaryForm';
import React from 'react';
import { ExpensesForm } from './ExpensesForm';
import { formatPrice } from 'utils/numberUtils';
import { Table } from 'common/table/Table';
import { TableRow } from 'common/table/TableRow';
import { TableItem } from 'common/table/TableItem';

export const Home = () => {
  const salary = useSelector(selectSalary);
  const expenses = useSelector(selectExpenses);

  const expensesString = expenses.map((expense) => expense.value);

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatPrice(salary.toString())}`}
        <SalaryForm />
      </div>
      <div>
        {`Here are your expenses ${expensesString}`}
        <ExpensesForm />
      </div>
      <div style={{ width: '700px' }}>
        <Table header={['Header 1', 'Header 2', 'Header 3']}>
          <TableRow>
            <TableItem>A</TableItem>
            <TableItem>B</TableItem>
            <TableItem>C</TableItem>
          </TableRow>
          <TableRow>
            <TableItem>Row 2 A</TableItem>
            <TableItem>Row 2 B</TableItem>
            <TableItem>Row 2 C</TableItem>
          </TableRow>
        </Table>
      </div>
    </div>
  );
};
