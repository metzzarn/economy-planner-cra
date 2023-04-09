import { Field, Form } from 'react-final-form';
import { convertToNumber } from 'utils/numberUtils';
import React from 'react';

export interface FormValues {
  name: string;
  value: string;
  description: string;
}

interface Props {
  action: (name: string, value: number, description: string) => void;
  namePlaceholder?: string;
  descriptionPlaceholder?: string;
  buttonText?: string;
}

export const FinancialEntryForm = (props: Props) => {
  const requiredName = (value: string) => (value ? undefined : 'Required');
  const requiredAmount = (value: string) => (value ? undefined : 'Required');
  const maxLengthDescription = (description: string) => {
    if (description && description.length > 15) {
      return 'Description cannot be longer than 50 characters';
    }
    return undefined;
  };

  return (
    <Form
      onSubmit={(formValues: FormValues) => {
        if (!formValues.name || !formValues.value) {
          return;
        }

        return props.action(
          formValues.name,
          convertToNumber(formValues.value),
          formValues.description
        );
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={'name'}
              component={'input'}
              type={'text'}
              validate={requiredName}
            >
              {({ input, meta }) => (
                <div>
                  <label>Name</label>
                  <input
                    {...input}
                    type={'text'}
                    placeholder={
                      props.namePlaceholder ? props.namePlaceholder : ''
                    }
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

            <Field
              name={'description'}
              component={'input'}
              type={'text'}
              validate={maxLengthDescription}
            >
              {({ input, meta }) => (
                <div>
                  <label>Description</label>
                  <input
                    {...input}
                    type={'text'}
                    placeholder={
                      props.descriptionPlaceholder
                        ? props.descriptionPlaceholder
                        : ''
                    }
                  />
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
