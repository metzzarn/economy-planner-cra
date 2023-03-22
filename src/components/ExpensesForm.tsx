import { Field, Form } from "react-final-form";
import { convertToNumber, formatPrice } from "../utils/numberUtils";
import React from "react";
import { addExpense } from "../redux/economySlice";
import { useAppDispatch } from "../hooks";

export interface ExpenseFormValues {
  name: string;
  value: string;
}

export const ExpensesForm = () => {
  const dispatch = useAppDispatch();

  return (
    <Form
      onSubmit={(expense: ExpenseFormValues) =>
        dispatch(
          addExpense({
            name: expense.name,
            value: convertToNumber(expense.value),
          })
        )
      }
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={"value"}
              component={"input"}
              type={"text"}
              format={formatPrice}
              formatOnBlur
              placeholder={"0,0 kr"}
            />
          </div>
          <div>
            <button type={"submit"}>Add expense</button>
          </div>
        </form>
      )}
    />
  );
};
