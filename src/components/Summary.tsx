import { useSelector } from 'react-redux';
import { selectExpenses } from 'redux/expensesSlice';
import { formatPrice } from 'utils/numberUtils';
import { selectIncome } from 'redux/incomeSlice';
import { selectSavings } from 'redux/savingsSlice';

export const Summary = () => {
  const income = useSelector(selectIncome);
  const expenses = useSelector(selectExpenses);
  const savings = useSelector(selectSavings);

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );
  const totalSavings = savings.reduce((acc, saving) => acc + saving.value, 0);
  const discretionaryIncome = income - totalSavings - totalExpenses;

  return (
    <div>
      <h2>Summary</h2>
      <div>
        {`Discretionary income ${formatPrice(discretionaryIncome.toString())}`}
      </div>
    </div>
  );
};
