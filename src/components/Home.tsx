import { useSelector } from 'react-redux';
import { addExpense, addSaving, selectSalary } from 'redux/economySlice';
import { SalaryForm } from './SalaryForm';
import React from 'react';
import { DescriptionAmountForm } from 'components/DescriptionAmountForm';
import { formatPrice } from 'utils/numberUtils';
import { ExpensesTable } from 'components/ExpensesTable';
import { SavingsTable } from 'components/SavingsTable';
import { useAppDispatch } from 'hooks';

export const Home = () => {
  const dispatch = useAppDispatch();
  const salary = useSelector(selectSalary);

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatPrice(salary.toString())}`}
        <SalaryForm />
      </div>
      <DescriptionAmountForm
        action={(name, value) => dispatch(addExpense({ name, value }))}
        placeholder={'Rent'}
        buttonText={'Add expense'}
      />
      <ExpensesTable />
      <DescriptionAmountForm
        action={(name, value) => dispatch(addSaving({ name, value }))}
        placeholder={'Car'}
        buttonText={'Add saving'}
      />
      <SavingsTable />
    </div>
  );
};
