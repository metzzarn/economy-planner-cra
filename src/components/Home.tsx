import { useSelector } from 'react-redux';
import { selectSalary } from 'redux/economySlice';
import { SalaryForm } from './SalaryForm';
import React from 'react';
import { ExpensesForm } from './ExpensesForm';
import { formatPrice } from 'utils/numberUtils';
import { ExpensesTable } from 'components/ExpensesTable';
import { SavingsTable } from 'components/SavingsTable';

export const Home = () => {
  const salary = useSelector(selectSalary);

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatPrice(salary.toString())}`}
        <SalaryForm />
      </div>
      <ExpensesForm />
      <ExpensesTable />
      <SavingsTable />
    </div>
  );
};
