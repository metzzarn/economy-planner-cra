import { IncomeForm } from 'components/IncomeForm';
import React from 'react';
import { FinancialEntryForm } from 'components/FinancialEntryForm';
import { formatPrice } from 'utils/numberUtils';
import { ExpensesTable } from 'components/ExpensesTable';
import { SavingsTable } from 'components/SavingsTable';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Summary } from 'components/Summary';
import { selectIncome } from 'redux/incomeSlice';
import { addExpense } from 'redux/expensesSlice';
import { addSaving } from 'redux/savingsSlice';
import { IncomeList } from 'components/IncomeList';
import { StateManagement } from 'components/StateManagement';
import { selectDecimalPlaces } from 'redux/settingsSlice';

export const Home = () => {
  const dispatch = useAppDispatch();
  const income = useAppSelector(selectIncome);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);

  return (
    <div>
      <h2>Home</h2>
      <StateManagement />
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatPrice(income.toString(), decimalPlaces)}`}
        <IncomeForm />
        <IncomeList />
      </div>
      <FinancialEntryForm
        action={(name, value, description) =>
          dispatch(addExpense({ name, value, description }))
        }
        namePlaceholder={'Rent'}
        descriptionPlaceholder={'E-faktura'}
        buttonText={'Add expense'}
      />
      <ExpensesTable />
      <FinancialEntryForm
        action={(name, value, description) =>
          dispatch(addSaving({ name, value, description }))
        }
        namePlaceholder={'Car'}
        descriptionPlaceholder={'Autogiro - den 25e'}
        buttonText={'Add saving'}
      />
      <SavingsTable />
      <Summary />
    </div>
  );
};
