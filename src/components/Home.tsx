import { useSelector } from 'react-redux';
import { IncomeForm } from 'components/IncomeForm';
import React from 'react';
import { FinancialEntryForm } from 'components/FinancialEntryForm';
import { formatPrice } from 'utils/numberUtils';
import { ExpensesTable } from 'components/ExpensesTable';
import { SavingsTable } from 'components/SavingsTable';
import { useAppDispatch } from 'hooks';
import { Summary } from 'components/Summary';
import { selectIncome } from 'redux/incomeSlice';
import { addExpense } from 'redux/expensesSlice';
import { addSaving } from 'redux/savingsSlice';
import { IncomeList } from 'components/IncomeList';

export const Home = () => {
  const dispatch = useAppDispatch();
  const income = useSelector(selectIncome);

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: '10px' }}>
        {`Your salary is ${formatPrice(income.toString())}`}
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
