import { Field, Form } from 'react-final-form';
import { convertToNumber } from 'utils/numberUtils';
import React from 'react';
import { useAppDispatch } from 'hooks';
import { setIncome } from 'redux/salarySlice';

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
              name={'salary'}
              component={'input'}
              type={'text'}
              placeholder={'0,0 kr'}
            />
          </div>
          <div>
            <button type={'submit'}>Set net salary</button>
          </div>
        </form>
      )}
    />
  );
};
