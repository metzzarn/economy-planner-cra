import { Field, Form } from 'react-final-form';
import { convertToNumber } from 'utils/numberUtils';
import React from 'react';

export interface FormValues {
  name: string;
  value: string;
}

interface Props {
  action: (name: string, value: number) => void;
  placeholder?: string;
  buttonText?: string;
}

export const DescriptionAmountForm = (props: Props) => {
  const requiredDescription = (value: string) =>
    value ? undefined : 'Required';
  const requiredAmount = (value: string) => (value ? undefined : 'Required');

  return (
    <Form
      onSubmit={(formValues: FormValues) => {
        if (!formValues.name || !formValues.value) {
          return;
        }

        return props.action(formValues.name, convertToNumber(formValues.value));
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={'name'}
              component={'input'}
              type={'text'}
              validate={requiredDescription}
            >
              {({ input, meta }) => (
                <div>
                  <label>Description</label>
                  <input
                    {...input}
                    type={'text'}
                    placeholder={props.placeholder ? props.placeholder : ''}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name={'value'}
              component={'input'}
              type={'text'}
              formatOnBlur
              validate={requiredAmount}
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
            <button type={'submit'}>
              {props.buttonText ? props.buttonText : 'Submit'}
            </button>
          </div>
        </form>
      )}
    />
  );
};
