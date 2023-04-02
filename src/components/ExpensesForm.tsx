import { Field, Form } from 'react-final-form';
import { convertToNumber, formatPrice } from 'utils/numberUtils';
import React from 'react';
import { addExpense } from 'redux/economySlice';
import { useAppDispatch } from 'hooks';

export interface ExpenseFormValues {
  name: string;
  value: string;
}

export const ExpensesForm = () => {
  const dispatch = useAppDispatch();

  const required = (value: string) => (value ? undefined : 'Required');

  return (
    <Form
      onSubmit={(expense: ExpenseFormValues) => {
        if (!expense.name || !expense.value) {
          return;
        }

        return dispatch(
          addExpense({
            name: expense.name,
            value: convertToNumber(expense.value),
          })
        );
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={'name'}
              component={'input'}
              type={'text'}
              validate={required}
            >
              {({ input, meta }) => (
                <div>
                  <label>Description</label>
                  <input {...input} type="text" placeholder="Rent" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name={'value'}
              component={'input'}
              type={'text'}
              format={formatPrice}
              formatOnBlur
              validate={required}
            >
              {({ input, meta }) => (
                <div>
                  <label>Amount</label>
                  <input {...input} type="text" placeholder="0,0 kr" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <button type={'submit'}>Add expense</button>
          </div>
        </form>
      )}
    />
  );
};
