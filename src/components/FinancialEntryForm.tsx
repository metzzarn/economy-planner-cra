import { Field, Form } from 'react-final-form';
import { convertToNumber } from 'utils/numberUtils';
import React from 'react';
import {
  maxLength,
  requiredMaxLength,
  requiredString,
} from 'utils/fieldValidation';

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
              validate={(value) =>
                requiredMaxLength(
                  value,
                  'Name cannot be longer than 20 characters'
                )
              }
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
              validate={requiredString}
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
              validate={(value) =>
                maxLength(
                  value,
                  'Description cannot be longer than 20 characters'
                )
              }
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
