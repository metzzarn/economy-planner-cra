import { Field, Form } from "react-final-form";
import { convertToNumber, formatPrice } from "../utils/numberUtils";
import React from "react";
import { setIncome } from "../redux/economySlice";
import { useAppDispatch } from "../hooks";

export interface SalaryFormValues {
  salary: string;
}

export const SalaryForm = () => {
  const dispatch = useAppDispatch();

  return (
    <Form
      onSubmit={(salary: SalaryFormValues) =>
        dispatch(setIncome(convertToNumber(salary.salary)))
      }
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={"salary"}
              component={"input"}
              type={"text"}
              format={formatPrice}
              formatOnBlur
              placeholder={"0,0 kr"}
            />
          </div>
          <div>
            <button type={"submit"}>Set salary</button>
          </div>
        </form>
      )}
    />
  );
};
