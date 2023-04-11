import { useSelector } from 'react-redux';
import { selectExpenses, selectSalary } from 'redux/economySlice';
import { formatPrice } from 'utils/numberUtils';

export const Summary = () => {
  const salary = useSelector(selectSalary);
  const expenses = useSelector(selectExpenses);

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );
  const discretionaryIncome = salary - totalExpenses;

  return (
    <div>
      <h2>Summary</h2>
      <div>
        {`Discretionary income ${formatPrice(discretionaryIncome.toString())}`}
      </div>
    </div>
  );
};
