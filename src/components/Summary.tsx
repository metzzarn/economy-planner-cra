import { selectExpenses } from 'redux/expensesSlice';
import { selectIncome } from 'redux/incomeSlice';
import { selectSavings } from 'redux/savingsSlice';
import { useAppSelector } from 'hooks';
import { selectDecimalPlaces, selectLanguage } from 'redux/settingsSlice';
import { FinancialEntry } from 'redux/common';
import { formatPrice } from 'utils/numberUtils';

export const Summary = () => {
  const income = useAppSelector(selectIncome);
  const expenses = useAppSelector(selectExpenses);
  const savings = useAppSelector(selectSavings);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);
  const language = useAppSelector(selectLanguage);

  const totalExpenses = expenses.reduce(
    (acc: number, expense: FinancialEntry) =>
      expense.value ? acc + expense.value : 0,
    0
  );
  const totalSavings = savings.reduce(
    (acc: number, saving: FinancialEntry) =>
      saving.value ? acc + saving.value : 0,
    0
  );
  const discretionaryIncome = income - totalSavings - totalExpenses;

  return (
    <div>
      <h2>Summary</h2>
      <div>
        {`Discretionary income ${formatPrice(
          discretionaryIncome.toString(),
          decimalPlaces,
          language
        )}`}
      </div>
    </div>
  );
};
