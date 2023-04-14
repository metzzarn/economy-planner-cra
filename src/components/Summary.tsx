import { useSelector } from 'react-redux';
import { selectExpenses } from 'redux/expensesSlice';
import { formatPrice } from 'utils/numberUtils';
import { selectSalary } from 'redux/salarySlice';
import { selectSavings } from 'redux/savingsSlice';

export const Summary = () => {
  const salary = useSelector(selectSalary);
  const expenses = useSelector(selectExpenses);
  const savings = useSelector(selectSavings);

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );
  const totalSavings = savings.reduce((acc, saving) => acc + saving.value, 0);
  const discretionaryIncome = salary - totalSavings - totalExpenses;

  return (
    <div>
      <h2>Summary</h2>
      <div>
        {`Discretionary income ${formatPrice(discretionaryIncome.toString())}`}
      </div>
    </div>
  );
};
