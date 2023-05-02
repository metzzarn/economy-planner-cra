import { IncomeForm } from 'components/IncomeForm';
import React from 'react';
import { formatPrice } from 'utils/numberUtils';
import { ExpensesTable } from 'components/ExpensesTable';
import { SavingsTable } from 'components/SavingsTable';
import { useAppSelector } from 'hooks';
import { Summary } from 'components/Summary';
import { selectIncome } from 'redux/incomeSlice';
import { IncomeList } from 'components/IncomeList';
import { selectCurrency, selectDecimalPlaces } from 'redux/settingsSlice';

export const Home = () => {
  const income = useAppSelector(selectIncome);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);
  const currency = useAppSelector(selectCurrency);

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatPrice(
          income.toString(),
          decimalPlaces,
          currency
        )}`}
        <IncomeForm />
        <IncomeList />
      </div>
      <ExpensesTable />
      <SavingsTable />
      <Summary />
    </div>
  );
};
