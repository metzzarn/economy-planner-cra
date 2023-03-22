import { useSelector } from "react-redux";
import { selectExpenses, selectSalary } from "../redux/economySlice";
import { SalaryForm } from "./SalaryForm";
import React from "react";
import { ExpensesForm } from "./ExpensesForm";
import { formatPrice } from "../utils/numberUtils";

export const Home = () => {
  const salary = useSelector(selectSalary);
  const expenses = useSelector(selectExpenses);

  const expensesString = expenses.map((expense) => expense.value);

  return (
    <div>
      <h2>Home</h2>
      <div style={{ marginBottom: "10px" }}>
        {`Your salary is ${formatPrice(salary.toString())}`}
        <SalaryForm />
      </div>
      <div>
        {`Here are your expenses ${expensesString}`}
        <ExpensesForm />
      </div>
    </div>
  );
};
