import { selectExpenses } from 'redux/expensesSlice';
import { formatPrice } from 'utils/numberUtils';
import { selectIncome } from 'redux/incomeSlice';
import { selectSavings } from 'redux/savingsSlice';
import { FinancialEntry } from 'redux/common';
import { useAppSelector } from 'hooks';
import { selectDecimalPlaces } from 'redux/settingsSlice';

export const Summary = () => {
  const income = useAppSelector(selectIncome);
  const expenses = useAppSelector(selectExpenses);
  const savings = useAppSelector(selectSavings);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);

  const totalExpenses = expenses.reduce(
    (acc: number, expense: FinancialEntry) => acc + expense.value,
    0
  );
  const totalSavings = savings.reduce(
    (acc: number, saving: FinancialEntry) => acc + saving.value,
    0
  );
  const discretionaryIncome = income - totalSavings - totalExpenses;

  return (
    <div>
      <h2>Summary</h2>
      <div>
        {`Discretionary income ${formatPrice(
          discretionaryIncome.toString(),
          decimalPlaces
        )}`}
      </div>
    </div>
  );
};
